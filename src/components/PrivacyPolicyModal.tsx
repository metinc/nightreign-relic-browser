import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface PrivacyPolicyModalProps {
  open: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
      sx={{
        "& .MuiDialog-paper": {
          maxHeight: "90vh",
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5">Datenschutzerklärung</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ mt: 1 }}>
          <Typography variant="h6" gutterBottom>
            1. Verantwortlicher
          </Typography>
          <Typography variant="body1" component={"p"}>
            Verantwortlich für diese Website ist:
            <br />
            Metin Celik
            <br />
            <br />
            Kontakt: über das Impressum dieser Website
          </Typography>

          <Typography variant="h6" gutterBottom>
            2. Google Consent Mode V2
          </Typography>
          <Typography variant="body1" component={"p"}>
            Diese Website verwendet Google Analytics 4 mit dem Google Consent
            Mode V2. Dies bedeutet, dass auch bei abgelehnten Cookies
            anonymisierte Statistiken erhoben werden können, um die Website zu
            verbessern.
          </Typography>

          <Typography variant="h6" gutterBottom>
            3. Google Analytics
          </Typography>
          <Typography variant="body1" component={"p"}>
            Diese Website nutzt Google Analytics, einen Webanalysedienst der
            Google LLC ("Google"). Google Analytics verwendet verschiedene
            Technologien, um die Nutzung der Website zu analysieren.
          </Typography>

          <Typography variant="body1" component={"p"}>
            <strong>Bei abgelehnten Cookies:</strong>
            <br />
            • Anonyme Seitenaufrufe werden weiterhin gezählt (ohne Cookies)
            <br />
            • Keine personenbezogenen Daten werden gespeichert
            <br />• Grundlegende Statistiken für Website-Verbesserungen
          </Typography>

          <Typography variant="body1" component={"p"}>
            <strong>Bei akzeptierten Analytics-Cookies:</strong>
            <br />
            • Detaillierte Nutzungsanalysen mit Cookies
            <br />
            • User-Journey-Verfolgung für bessere Nutzererfahrung
            <br />• Alle Daten werden anonymisiert verarbeitet
          </Typography>

          <Typography variant="body1" component={"p"}>
            <strong>IP-Anonymisierung:</strong> Wir haben die IP-Anonymisierung
            auf dieser Website aktiviert. Dadurch wird Ihre IP-Adresse von
            Google innerhalb von Mitgliedstaaten der Europäischen Union oder in
            anderen Vertragsstaaten des Abkommens über den Europäischen
            Wirtschaftsraum vor der Übertragung in die USA gekürzt.
          </Typography>

          <Typography variant="h6" gutterBottom>
            4. Cookie-Kategorien
          </Typography>
          <Typography variant="body1" component={"p"}>
            <strong>Notwendige Cookies:</strong> Diese sind für das
            Funktionieren der Website erforderlich und können nicht deaktiviert
            werden.
          </Typography>
          <Typography variant="body1" component={"p"}>
            <strong>Analyse-Cookies:</strong> Helfen uns zu verstehen, wie
            Besucher mit der Website interagieren. Diese können Sie über unseren
            Cookie-Banner steuern.
          </Typography>
          <Typography variant="body1" component={"p"}>
            <strong>Marketing-Cookies:</strong> Aktuell nicht verwendet, aber
            für zukünftige Werbemaßnahmen vorgesehen.
          </Typography>

          <Typography variant="h6" gutterBottom>
            5. Cookie-Einstellungen verwalten
          </Typography>
          <Typography variant="body1" component={"p"}>
            Sie können Ihre Cookie-Einstellungen jederzeit ändern:
            <br />
            • Über die Browsereinstellungen
            <br />
            • Durch Löschen der lokalen Website-Daten (löst erneute Abfrage aus)
            <br />• Kontaktieren Sie uns für individuelle Anfragen
          </Typography>

          <Typography variant="h6" gutterBottom>
            6. Ihre Rechte nach DSGVO
          </Typography>
          <Typography variant="body1" component={"p"}>
            Sie haben das Recht:
          </Typography>
          <Box component="ul" sx={{ pl: 3, mt: 1 }}>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten
              zu verlangen
            </Typography>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              Berichtigung unrichtiger Daten zu verlangen
            </Typography>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              Löschung Ihrer bei uns gespeicherten Daten zu verlangen
            </Typography>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              Einschränkung der Datenverarbeitung zu verlangen
            </Typography>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              Der Datenverarbeitung zu widersprechen
            </Typography>
            <Typography component="li" variant="body1" sx={{ mb: 1 }}>
              Datenübertragbarkeit zu verlangen
            </Typography>
          </Box>

          <Typography variant="h6" gutterBottom>
            7. Datenspeicherung
          </Typography>
          <Typography variant="body1" component={"p"}>
            Ihre Cookie-Einstellungen werden lokal in Ihrem Browser gespeichert.
            Analytics-Daten werden entsprechend den Google Analytics
            Aufbewahrungsrichtlinien verarbeitet (standardmäßig 26 Monate).
          </Typography>

          <Typography variant="h6" gutterBottom>
            8. Kontakt
          </Typography>
          <Typography variant="body1" component={"p"}>
            Bei Fragen zum Datenschutz können Sie sich über das Impressum an uns
            wenden. Für Beschwerden können Sie sich auch an die zuständige
            Datenschutzbehörde wenden.
          </Typography>

          <Typography
            variant="body2"
            sx={{ mt: 4, fontStyle: "italic", textAlign: "center" }}
          >
            Stand: {new Date().toLocaleDateString("de-DE")}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
