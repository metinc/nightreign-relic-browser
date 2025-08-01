import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
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
        Datenschutzerklärung
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
        <Typography variant="h5" pt={2}>
          1. Verantwortlicher
        </Typography>
        <Typography variant="body1" component={"p"}>
          Metin Celik (Kontakt über Impressum)
        </Typography>

        <Typography variant="h5" pt={3}>
          2. Google Analytics
        </Typography>
        <Typography variant="body1" component={"p"}>
          Diese Website nutzt Google Analytics zur Analyse der Websitenutzung.
          Bei Zustimmung werden Cookies gesetzt, bei Ablehnung erfolgt nur
          anonyme Messung. IP-Adressen werden gekürzt übertragen.
        </Typography>

        <Typography variant="h5" pt={3}>
          3. Ihre Rechte (DSGVO)
        </Typography>
        <Typography variant="body1" component={"p"}>
          Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch,
          Datenübertragbarkeit. Cookie-Einstellungen können jederzeit über den
          Browser geändert werden.
        </Typography>

        <Typography variant="h5" pt={3}>
          4. Kontakt
        </Typography>
        <Typography variant="body1" component={"p"}>
          Datenschutzfragen über das Impressum. Beschwerden an zuständige
          Datenschutzbehörde möglich.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
