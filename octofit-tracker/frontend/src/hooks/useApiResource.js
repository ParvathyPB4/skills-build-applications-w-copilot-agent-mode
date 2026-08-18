import { useEffect, useState } from 'react'
import { fetchResource } from '../api'

export function useApiResource(resource) {
  const [state, setState] = useState({ data: [], loading: true, error: '' })
  useEffect(() => {
    const controller = new AbortController()
    fetchResource(resource, controller.signal).then((data) => setState({ data, loading: false, error: '' })).catch((error) => {
      if (error.name !== 'AbortError') setState({ data: [], loading: false, error: error.message })
    })
    return () => controller.abort()
  }, [resource])
  return state
}