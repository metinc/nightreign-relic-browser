import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Link,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

export const Impressum: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Link
        component="button"
        variant="body2"
        onClick={handleOpen}
        sx={{
          color: "text.secondary",
          fontSize: "0.75rem",
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
      >
        Impressum
      </Link>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        scroll="paper"
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
          Impressum
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Box sx={{ "& p": { mb: 2 }, "& strong": { fontWeight: 600 } }}>
            <Typography variant="body2" component="p">
              Angaben gemäß § 5 DDG
            </Typography>

            <Typography variant="body2" component="p">
              Metin Çelik
              <br />
              Hollandstr. 68
              <br />
              44309 Dortmund
            </Typography>

            <Typography variant="body2" component="p">
              <strong>Vertreten durch:</strong>
              <br />
              Metin Çelik
            </Typography>

            <Typography variant="body2" component="p">
              <strong>Kontakt:</strong>
              <br />
              Telefon: 0049-15165151665
              <br />
              E-Mail:{" "}
              <Link href="mailto:metincelik88@gmail.com">
                metincelik88@gmail.com
              </Link>
            </Typography>

            <Typography variant="body2" component="p">
              <strong>Umsatzsteuer-ID:</strong>
              <br />
              Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz:
              DE312724905
            </Typography>

            <Typography variant="body2" component="p">
              <strong>Haftungsausschluss:</strong>
            </Typography>

            <Typography variant="body2" component="p">
              <strong>Markenrechte:</strong>
              <br />
              Elden Ring™ ist eine Marke von Bandai Namco Entertainment Inc. und
              FromSoftware Inc.
              <br />
              <br />
              Diese Website ist nicht mit Bandai Namco Entertainment Inc. oder
              FromSoftware Inc. verbunden, von ihnen unterstützt oder
              gesponsert.
              <br />
              <br />
              Diese Website ist ein inoffizielles Fan-Tool und steht in keiner
              Verbindung zu den offiziellen Herstellern des Spiels.
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
