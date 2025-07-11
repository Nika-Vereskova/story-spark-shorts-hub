
import posthog from 'posthog-js'

export const initPostHog = () => {
  if (typeof window !== 'undefined') {
    posthog.init(
      'phc_hjKYkeUWstydEdcl4pguPUhNVJRl4MdZXjb5a1l8b3P',
      {
        api_host: 'https://app.posthog.com',
        loaded: (posthog) => {
          if (process.env.NODE_ENV === 'development') console.log('PostHog loaded')
        }
      }
    )
  }
}

export { posthog }
