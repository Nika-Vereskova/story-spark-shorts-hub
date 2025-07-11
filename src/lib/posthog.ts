
import posthog from 'posthog-js'

export const initPostHog = () => {
  if (typeof window !== 'undefined') {
    posthog.init(
      'phc_xDJDwsJOrjhAQwLOoMMLQTdPlt3pMnF0UJmk3Rci8yU', // You'll need to replace this with your actual PostHog project API key
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
