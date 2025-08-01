import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Link,
} from "@mui/material";
import type { ConsentPreferences } from "../utils/ConsentUtils";
import {
  storeConsent,
  CONSENT_VERSION,
  CONSENT_KEY,
} from "../utils/ConsentUtils";
import { PrivacyPolicyModal } from "./PrivacyPolicyModal";

interface CookieConsentProps {
  onAcceptAll: () => void;
  onAcceptSelected: (preferences: ConsentPreferences) => void;
  onRejectAll: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({
  onAcceptAll,
  onAcceptSelected,
  onRejectAll,
}) => {
  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already given consent
    const storedConsent = localStorage.getItem(CONSENT_KEY);
    if (!storedConsent) {
      setOpen(true);
    } else {
      try {
        const consent = JSON.parse(storedConsent);
        if (consent.version !== CONSENT_VERSION) {
          // New version, ask for consent again
          setOpen(true);
        }
      } catch {
        // Invalid stored consent, ask again
        setOpen(true);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const fullConsent: ConsentPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };

    storeConsent(fullConsent);
    setOpen(false);
    onAcceptAll();
  };

  const handleAcceptSelected = () => {
    storeConsent(preferences);
    setOpen(false);
    onAcceptSelected(preferences);
  };

  const handleRejectAll = () => {
    const minimalConsent: ConsentPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };

    storeConsent(minimalConsent);
    setOpen(false);
    onRejectAll();
  };

  const handlePreferenceChange =
    (key: keyof ConsentPreferences) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (key === "necessary") return; // Cannot change necessary cookies

      setPreferences((prev) => ({
        ...prev,
        [key]: event.target.checked,
      }));
    };

  if (!open) return null;

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      disableEscapeKeyDown
      slotProps={{
        paper: {
          sx: {
            position: "fixed",
            bottom: 16,
            left: "50%",
            transform: "translateX(-50%)",
            margin: 0,
            maxWidth: "480px",
            maxHeight: "90vh",
            borderRadius: "16px",
            width: "calc(100% - 32px)",
            "@media (min-width: 512px)": {
              width: "480px",
            },
          },
        },
      }}
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6">🍪 Cookie-Einstellungen</Typography>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Diese Website verwendet Cookies, um Ihnen die bestmögliche Erfahrung
          zu bieten. Sie können Ihre Einstellungen jederzeit ändern.
        </Typography>

        {showDetails && (
          <Box sx={{ mt: 2 }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={preferences.necessary}
                    disabled
                    onChange={handlePreferenceChange("necessary")}
                  />
                }
                label={
                  <Box>
                    <Typography variant="subtitle2">
                      Notwendige Cookies
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Diese Cookies sind für das Funktionieren der Website
                      erforderlich und können nicht deaktiviert werden.
                    </Typography>
                  </Box>
                }
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={preferences.analytics}
                    onChange={handlePreferenceChange("analytics")}
                  />
                }
                label={
                  <Box>
                    <Typography variant="subtitle2">Analyse-Cookies</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Diese Cookies helfen uns zu verstehen, wie Besucher mit
                      der Website interagieren, indem sie Informationen anonym
                      sammeln und melden.
                    </Typography>
                  </Box>
                }
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={preferences.marketing}
                    onChange={handlePreferenceChange("marketing")}
                  />
                }
                label={
                  <Box>
                    <Typography variant="subtitle2">
                      Marketing-Cookies
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Diese Cookies werden verwendet, um Ihnen relevante Werbung
                      zu zeigen.
                    </Typography>
                  </Box>
                }
              />
            </FormGroup>
          </Box>
        )}

        <Typography variant="body2" sx={{ mt: 2 }}>
          Weitere Informationen finden Sie in unserer{" "}
          <Link
            component="button"
            onClick={() => setPrivacyModalOpen(true)}
            color="primary"
            sx={{
              textDecoration: "underline",
              cursor: "pointer",
              background: "none",
              border: "none",
              padding: 0,
              font: "inherit",
            }}
          >
            Datenschutzerklärung
          </Link>
          .
        </Typography>
      </DialogContent>

      <DialogActions sx={{ flexDirection: "column", gap: 1, p: 2 }}>
        {!showDetails ? (
          <>
            <Button
              onClick={handleAcceptAll}
              variant="contained"
              fullWidth
              size="large"
            >
              Alle akzeptieren
            </Button>

            <Button
              onClick={() => setShowDetails(true)}
              variant="outlined"
              fullWidth
              size="large"
            >
              Einstellungen verwalten
            </Button>

            <Button
              onClick={handleRejectAll}
              variant="text"
              fullWidth
              size="large"
            >
              Alle ablehnen
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={handleAcceptSelected}
              variant="contained"
              fullWidth
              size="large"
            >
              Auswahl speichern
            </Button>

            <Button
              onClick={handleAcceptAll}
              variant="outlined"
              fullWidth
              size="large"
            >
              Alle akzeptieren
            </Button>

            <Button
              onClick={() => setShowDetails(false)}
              variant="text"
              fullWidth
              size="large"
            >
              Zurück
            </Button>
          </>
        )}
      </DialogActions>

      <PrivacyPolicyModal
        open={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />
    </Dialog>
  );
};
