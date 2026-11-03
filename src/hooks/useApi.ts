import { useCallback, useEffect, useState } from 'react'

export type ApiState<T> =
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'success'; data: T }

interface UseApiOptions {
  /** Re-fetch silently every N ms while the page is visible (no loading state, last data kept on failure). */
  refreshIntervalMs?: number
}

/** Runs `fetcher` on mount and exposes its state plus a `retry` function. `fetcher` must be stable. */
export function useApi<T>(fetcher: (signal: AbortSignal) => Promise<T>, { refreshIntervalMs }: UseApiOptions = {}) {
  const [state, setState] = useState<ApiState<T>>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    fetcher(controller.signal)
      .then((data) => setState({ status: 'success', data }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        setState({
          status: 'error',
          error: error instanceof Error ? error : new Error(String(error)),
        })
      })

    return () => controller.abort()
  }, [fetcher, attempt])

  useEffect(() => {
    if (!refreshIntervalMs) return

    const controller = new AbortController()
    let inFlight = false

    const refresh = () => {
      if (document.hidden || inFlight) return
      inFlight = true
      fetcher(controller.signal)
        .then((data) =>
          // Skip the re-render when nothing changed.
          setState((prev) =>
            prev.status === 'success' && JSON.stringify(prev.data) === JSON.stringify(data)
              ? prev
              : { status: 'success', data },
          ),
        )
        .catch(() => {}) // keep showing the last known data
        .finally(() => {
          inFlight = false
        })
    }

    const id = setInterval(refresh, refreshIntervalMs)
    document.addEventListener('visibilitychange', refresh)

    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', refresh)
      controller.abort()
    }
  }, [fetcher, refreshIntervalMs])

  const retry = useCallback(() => {
    setState({ status: 'loading' })
    setAttempt((n) => n + 1)
  }, [])

  return { state, retry }
}
