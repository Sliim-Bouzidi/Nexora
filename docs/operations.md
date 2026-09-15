# Operations Guide

Production runs on Kubernetes, in the `nexora` namespace, on the same host as the self-hosted GitHub Actions runner. Docker Compose (below) is for local development only.

## Service status and logs

```bash
kubectl get pods -n nexora
kubectl get deployments -n nexora
kubectl logs -n nexora -l app=nexora-landing -f
kubectl logs -n nexora -l app=nexora-dashboard -f
kubectl logs -n nexora -l app=postgres -f
curl -I http://localhost
```

Expected health-check result: `HTTP/1.1 200 OK`.

## First-level diagnostics

| Check | Command | What it shows |
| --- | --- | --- |
| Pod status | `kubectl get pods -n nexora` | Which pods are running, crashlooping, or pending |
| Rollout status | `kubectl rollout status deployment/nexora-landing -n nexora` | Whether the latest deploy actually finished |
| Application logs | `kubectl logs -n nexora -l app=nexora-landing --tail=100` | Next.js startup or runtime errors |
| Dashboard logs | `kubectl logs -n nexora -l app=nexora-dashboard --tail=100` | Dashboard/Clerk auth errors |
| Database health | `kubectl exec -n nexora deploy/postgres -- pg_isready -U nexora -d nexora_cms` | Whether Postgres is accepting connections |
| Ingress routing | `kubectl describe ingress nexora-ingress -n nexora` | Path-to-service mapping and any routing errors |
| HTTP response | `curl -I http://localhost` | Whether the Ingress can serve the site end-to-end |
| Events (any namespace issue) | `kubectl get events -n nexora --sort-by=.lastTimestamp` | Scheduling failures, image pull errors, OOMKills |

## Restart or force a re-pull

```bash
kubectl rollout restart deployment/nexora-landing -n nexora
kubectl rollout restart deployment/nexora-dashboard -n nexora
```

## Re-applying manifests manually

Normally only CI/CD does this, but if you need to sync manifests by hand:

```bash
kubectl apply --validate=false -k k8s/
```

## CI/CD runner service

The self-hosted runner executes the `deploy` stage of the pipeline. Check it with:

```bash
cd ~/actions-runner
sudo ./svc.sh status
```

Restart it after a problem:

```bash
cd ~/actions-runner
sudo ./svc.sh restart
```

## Security practices

- Real secrets are never committed. `k8s/02-secrets.yaml.template` is a placeholder; the actual `Secret` object is created once, directly on the cluster, and excluded from Git.
- `.env.example` mirrors the real variable names for local development — it never contains real values.
- The CI/CD workflow has read-only repository-content permission; Docker Hub and cluster credentials are stored as GitHub Actions secrets, never in code.
- Deployment (the `deploy` job) runs only for pushes to `main`, never for pull requests.
- Postgres has no `NodePort`/external exposure — it's `ClusterIP`-only, reachable exclusively from inside the `nexora` namespace.
- Docker images are tagged by commit SHA, not just `latest`, specifically so a bad deploy can be rolled back to an exact previous image (see below).

## Rollback

Because every image is tagged with its commit SHA, rollback doesn't require rebuilding anything — just point the deployments at the previous known-good SHA:

```bash
# Find the previous good commit SHA
git log --oneline

kubectl set image deployment/nexora-landing nexora-landing=<dockerhub-user>/nexora:<previous-sha> -n nexora
kubectl set image deployment/nexora-dashboard nexora-dashboard=<dockerhub-user>/nexora-dashboard:<previous-sha> -n nexora

kubectl rollout status deployment/nexora-landing -n nexora
kubectl rollout status deployment/nexora-dashboard -n nexora
```

Alternatively, revert the commit in Git and let CI/CD redeploy the reverted state normally:

```bash
git revert <bad-commit-sha>
git push origin main
```

Confirm the new pipeline run is green in GitHub Actions, then check the site with `curl -I http://localhost`.

## Local development stack (Docker Compose)

Not used in production — this exists purely so you can run the full stack (landing + dashboard + Postgres + Nginx) locally without a Kubernetes cluster.

```bash
docker compose -p nexora ps
docker compose -p nexora logs -f
docker compose -p nexora logs nexora
docker compose -p nexora logs nexora-dashboard
docker compose -p nexora restart
docker compose -p nexora down
```
