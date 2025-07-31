import React from "react";
import { Container, Typography, Box, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button onClick={() => navigate("/")} variant="text" sx={{ mb: 2 }}>
        ← Zurück zur Startseite
      </Button>

      <Paper sx={{ p: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Datenschutzerklärung
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom>
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

          <Typography variant="h5" component="h2" gutterBottom>
            2. Erhebung und Verarbeitung personenbezogener Daten
          </Typography>
          <Typography variant="body1" component={"p"}>
            Diese Website verwendet Google Analytics zur Analyse der
            Websitenutzung. Google Analytics verwendet Cookies, um Informationen
            über Ihre Nutzung der Website zu sammeln.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom>
            3. Google Analytics
          </Typography>
          <Typography variant="body1" component={"p"}>
            Diese Website nutzt Google Analytics, einen Webanalysedienst der
            Google LLC ("Google"). Google Analytics verwendet Cookies, die eine
            Analyse der Benutzung der Website durch Sie ermöglichen.
          </Typography>

          <Typography variant="body1" component={"p"}>
            Die durch das Cookie erzeugten Informationen über Ihre Benutzung
            dieser Website werden in der Regel an einen Server von Google in den
            USA übertragen und dort gespeichert.
          </Typography>

          <Typography variant="body1" component={"p"}>
            <strong>IP-Anonymisierung:</strong> Wir haben die IP-Anonymisierung
            auf dieser Website aktiviert. Dadurch wird Ihre IP-Adresse von
            Google innerhalb von Mitgliedstaaten der Europäischen Union oder in
            anderen Vertragsstaaten des Abkommens über den Europäischen
            Wirtschaftsraum vor der Übertragung in die USA gekürzt.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom>
            4. Cookie-Einstellungen
          </Typography>
          <Typography variant="body1" component={"p"}>
            Sie können Ihre Cookie-Einstellungen jederzeit ändern, indem Sie die
            Cookie-Einstellungen in Ihrem Browser anpassen oder unsere Website
            erneut besuchen. Bei einem erneuten Besuch ohne gespeicherte
            Einstellungen wird der Cookie-Banner erneut angezeigt.
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom>
            5. Ihre Rechte
          </Typography>
          <Typography variant="body1" component={"p"}>
            Sie haben das Recht:
          </Typography>
          <Typography component="ul" sx={{ pl: 3 }}>
            <Typography component="li" variant="body1">
              Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten
              zu verlangen
            </Typography>
            <Typography component="li" variant="body1">
              Berichtigung unrichtiger Daten zu verlangen
            </Typography>
            <Typography component="li" variant="body1">
              Löschung Ihrer bei uns gespeicherten Daten zu verlangen
            </Typography>
            <Typography component="li" variant="body1">
              Einschränkung der Datenverarbeitung zu verlangen
            </Typography>
            <Typography component="li" variant="body1">
              Der Datenverarbeitung zu widersprechen
            </Typography>
          </Typography>

          <Typography variant="h5" component="h2" gutterBottom>
            6. Kontakt
          </Typography>
          <Typography variant="body1" component={"p"}>
            Bei Fragen zum Datenschutz können Sie sich über das Impressum an uns
            wenden.
          </Typography>

          <Typography variant="body2" sx={{ mt: 4, fontStyle: "italic" }}>
            Stand: {new Date().toLocaleDateString("de-DE")}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};
