const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName ? `https://${codespaceName}-8000.app.github.dev/api` : 'http://localhost:8000/api'

export function extractItems(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []
  if (Array.isArray(payload.data)) return payload.data
  if (Array.isArray(payload.results)) return payload.results
  if (Array.isArray(payload.items)) return payload.items
  if (payload.data && typeof payload.data === 'object') return extractItems(payload.data)
  return []
}

export async function fetchResource(resource, signal) {
  const response = await fetch(`${API_BASE_URL}/${resource}/`, { signal })
  if (!response.ok) throw new Error(`Unable to load ${resource} (${response.status})`)
  return extractItems(await response.json())
}