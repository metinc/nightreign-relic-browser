export interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CONSENT_KEY = "cookie-consent";
const CONSENT_VERSION = "1.0";

// Utility function to check current consent
export const getConsentPreferences = (): ConsentPreferences | null => {
  try {
    const storedConsent = localStorage.getItem(CONSENT_KEY);
    if (!storedConsent) return null;

    const consent = JSON.parse(storedConsent);
    if (consent.version !== CONSENT_VERSION) return null;

    return consent.preferences;
  } catch {
    return null;
  }
};

// Utility function to check if analytics is consented
export const hasAnalyticsConsent = (): boolean => {
  const preferences = getConsentPreferences();
  return preferences?.analytics === true;
};

// Utility function to store consent
export const storeConsent = (preferences: ConsentPreferences): void => {
  localStorage.setItem(
    CONSENT_KEY,
    JSON.stringify({
      version: CONSENT_VERSION,
      timestamp: Date.now(),
      preferences,
    })
  );
};

export { CONSENT_KEY, CONSENT_VERSION };
