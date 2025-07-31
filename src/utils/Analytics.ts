import { hasAnalyticsConsent } from "./ConsentUtils";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const GA_MEASUREMENT_ID = "G-YME15T0XQY";

// Initialize Google Analytics based on consent (Consent Mode V2)
export const initializeAnalytics = (hasConsent: boolean = false) => {
  if (!hasConsent) {
    // Set default consent to denied (but still allow anonymous pings)
    window.gtag?.("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      functionality_storage: "denied",
      personalization_storage: "denied",
      security_storage: "granted",
    });
    return;
  }

  // Enable analytics with full consent
  window.gtag?.("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied", // We only want analytics, not ads
    ad_user_data: "denied",
    ad_personalization: "denied",
    functionality_storage: "granted",
    personalization_storage: "granted",
    security_storage: "granted",
  });
};

// Update consent for analytics (Consent Mode V2)
export const updateAnalyticsConsent = (granted: boolean) => {
  if (!window.gtag) return;

  window.gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: "denied", // We don't use ads
    ad_user_data: "denied",
    ad_personalization: "denied",
    functionality_storage: granted ? "granted" : "denied",
    personalization_storage: granted ? "granted" : "denied",
  });

  if (granted) {
    // Send enhanced page view when consent is granted
    window.gtag("config", GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      allow_google_signals: false,
      cookie_flags: "secure;samesite=strict",
      send_page_view: true,
    });
  }
};

// Track events (only if consent is given)
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, unknown>
) => {
  if (!hasAnalyticsConsent() || !window.gtag) return;

  window.gtag("event", eventName, parameters);
};

// Track page views (only if consent is given)
export const trackPageView = (path: string, title?: string) => {
  if (!hasAnalyticsConsent() || !window.gtag) return;

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: title,
    anonymize_ip: true,
    allow_google_signals: false,
  });
};
