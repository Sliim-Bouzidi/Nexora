# Operations Guide

## Service status and logs

Run these commands from the repository directory, for example `~/Nexora` on the VM.

```bash
docker compose -p nexora ps
docker compose -p nexora logs -f
docker compose -p nexora logs nexora
docker compose -p nexora logs nginx
curl -I http://localhost
```

Expected health-check result: `HTTP/1.1 200 OK`.

## Start, stop, and restart

```bash
docker compose -p nexora up -d --build
docker compose -p nexora restart
docker compose -p nexora down
```

## First-level diagnostics

| Check | Command | What it shows |
| --- | --- | --- |
| Running containers | `docker compose -p nexora ps` | State and published ports |
| Application logs | `docker compose -p nexora logs nexora` | Next.js startup or runtime errors |
| Proxy logs | `docker compose -p nexora logs nginx` | Nginx request/proxy errors |
| HTTP response | `curl -I http://localhost` | Whether Nginx can serve the site |
| Port 80 owner | `sudo ss -ltnp | grep ':80'` | Process using the web port |
| Host disk space | `df -h` | Available VM disk space |
| Docker disk use | `docker system df` | Image, container, and cache usage |

## CI/CD runner service

The runner receives deployment jobs from GitHub. Check it with:

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

- Real `.env` files are ignored by Git; `.env.example` contains placeholders only.
- No passwords, keys, or tokens are stored in this repository.
- The CI/CD workflow has read-only repository-content permission.
- Deployment runs only for pushes to `main`, never for pull requests.
- Nginx is the only published service (`80:80`); the Next.js container is internal on port `3000`.
- The Dockerfile runs Nexora as the unprivileged `node` user.
- Docker base images use named version tags. Review and update them deliberately rather than using an unpinned `latest` tag.

## Rollback

This project uses source-based deployments, so the simple rollback method is to revert the faulty Git commit. The revert creates a new commit and automatically redeploys the previous application state.

```bash
git log --oneline
git revert <bad-commit-sha>
git push origin main
```

Confirm the new pipeline run is green in GitHub Actions, then check the site with:

```bash
curl -I http://localhost
```

Docker Hub or GitHub Container Registry can be added later to keep versioned images and roll back by image tag, but a registry is not required for this test-VM deployment.
