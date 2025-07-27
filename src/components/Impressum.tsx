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
              <strong>Google AdSense</strong>
              <br />
              Diese Website benutzt Google Adsense, einen Webanzeigendienst der
              Google Inc., USA ("Google"). Google Adsense verwendet sog.
              "Cookies" (Textdateien), die auf Ihrem Computer gespeichert werden
              und die eine Analyse der Benutzung der Website durch Sie
              ermöglicht. Google Adsense verwendet auch sog. "Web Beacons"
              (kleine unsichtbare Grafiken) zur Sammlung von Informationen.
              Durch die Verwendung des Web Beacons können einfache Aktionen wie
              der Besucherverkehr auf der Webseite aufgezeichnet und gesammelt
              werden. Die durch den Cookie und/oder Web Beacon erzeugten
              Informationen über Ihre Benutzung dieser Website (einschließlich
              Ihrer IP-Adresse) werden an einen Server von Google in den USA
              übertragen und dort gespeichert. Google wird diese Informationen
              benutzen, um Ihre Nutzung der Website im Hinblick auf die Anzeigen
              auszuwerten, um Reports über die Websiteaktivitäten und Anzeigen
              für die Websitebetreiber zusammenzustellen und um weitere mit der
              Websitenutzung und der Internetnutzung verbundene Dienstleistungen
              zu erbringen. Auch wird Google diese Informationen gegebenenfalls
              an Dritte übertragen, sofern dies gesetzlich vorgeschrieben oder
              soweit Dritte diese Daten im Auftrag von Google verarbeiten.
              Google wird in keinem Fall Ihre IP-Adresse mit anderen Daten der
              Google in Verbindung bringen. Das Speichern von Cookies auf Ihrer
              Festplatte und die Anzeige von Web Beacons können Sie verhindern,
              indem Sie in Ihren Browser-Einstellungen "keine Cookies
              akzeptieren" wählen (Im MS Internet-Explorer unter "Extras {
                ">"
              }{" "}
              Internetoptionen {">"} Datenschutz {">"} Einstellung"; im Firefox
              unter "Extras {">"} Einstellungen {">"} Datenschutz {">"}{" "}
              Cookies"); wir weisen Sie jedoch darauf hin, dass Sie in diesem
              Fall gegebenenfalls nicht sämtliche Funktionen dieser Website voll
              umfänglich nutzen können. Durch die Nutzung dieser Website
              erklären Sie sich mit der Bearbeitung der über Sie erhobenen Daten
              durch Google in der zuvor beschriebenen Art und Weise und zu dem
              zuvor benannten Zweck einverstanden.
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Schließen
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
