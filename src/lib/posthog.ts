
let realPosthog: any | null = null;
let initInFlight: Promise<void> | null = null;
const queuedEvents: Array<{ event: string; properties?: Record<string, unknown> }> = [];

export const initPostHog = async (): Promise<void> => {
  if (realPosthog) return;
  if (initInFlight) return initInFlight;

  initInFlight = (async () => {
    if (typeof window === 'undefined') return;
    const { default: posthogLib } = await import('posthog-js');

    posthogLib.init('phc_hjKYkeUWstydEdcl4pguPUhNVJRl4MdZXjb5a1l8b3P', {
      api_host: 'https://app.posthog.com',
      loaded: () => {
        if (process.env.NODE_ENV === 'development') console.log('PostHog loaded');
      }
    });

    realPosthog = posthogLib;

    // Flush queued events
    const eventsToFlush = queuedEvents.splice(0, queuedEvents.length);
    for (const { event, properties } of eventsToFlush) {
      try {
        realPosthog.capture(event, properties as any);
      } catch {
        // ignore
      }
    }
  })();

  return initInFlight;
};

const ensureInitialized = () => {
  if (!initInFlight) {
    // Prefer idle init to avoid competing with critical work
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => void initPostHog());
    } else {
      setTimeout(() => void initPostHog(), 1000);
    }
  }
};

export const posthog = {
  capture(event: string, properties?: Record<string, unknown>) {
    if (realPosthog) {
      try {
        realPosthog.capture(event, properties as any);
      } catch {
        // ignore
      }
      return;
    }
    queuedEvents.push({ event, properties });
    ensureInitialized();
  }
};

export { posthog as default };
