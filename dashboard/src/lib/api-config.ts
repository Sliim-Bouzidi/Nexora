export function getApiBaseUrl(): string {
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.hostname}/api/articles`;
  }
  return 'http://localhost/api/articles';
}
