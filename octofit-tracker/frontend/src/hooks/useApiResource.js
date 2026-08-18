import { useEffect, useState } from 'react'
import { extractItems } from '../api'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpointUrls = {
  activities: codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/activities` : 'http://localhost:8000/api/activities',
  leaderboard: codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard` : 'http://localhost:8000/api/leaderboard',
  teams: codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/teams` : 'http://localhost:8000/api/teams',
  users: codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/users` : 'http://localhost:8000/api/users',
  workouts: codespaceName ? `https://${codespaceName}-8000.app.github.dev/api/workouts` : 'http://localhost:8000/api/workouts',
}

export function useApiResource(resource) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    const fetchData = async () => {
      try {
        const endpoint = endpointUrls[resource] ?? (codespaceName
          ? `https://${codespaceName}-8000.app.github.dev/api/${resource}`
          : `http://localhost:8000/api/${resource}`)
        const response = await fetch(endpoint, { signal: controller.signal })
        if (!response.ok) throw new Error('Failed to fetch')
        const result = await response.json()
        setData(extractItems(result))
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    fetchData()
    return () => controller.abort()
  }, [resource])

  return { data, loading, error }
}