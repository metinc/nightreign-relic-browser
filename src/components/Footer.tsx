import { Box, Typography } from "@mui/material";
import { useState } from "react";
import packageJson from "../../package.json";
import { Impressum } from "./Impressum";
import { PrivacyPolicyModal } from "./PrivacyPolicyModal";

export function Footer() {
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 1,
        px: 2,
        textAlign: "center",
        borderTop: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ flex: 1 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography
          component="a"
          href="https://discord.gg/XUMJrhqyhw"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "text.secondary",
            fontSize: "0.75rem",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Discord
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: "0.75rem",
          }}
        >
          •
        </Typography>
        <Typography
          component="a"
          href="https://github.com/metinc/nightreign-relic-browser"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "text.secondary",
            fontSize: "0.75rem",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Source Code
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: "0.75rem",
          }}
        >
          •
        </Typography>
        <Typography
          component="a"
          href="https://buymeacoffee.com/metincelikw"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "text.secondary",
            fontSize: "0.75rem",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Buy me a coffee
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: "0.75rem",
          }}
        >
          •
        </Typography>
        <Typography
          component="button"
          onClick={() => setPrivacyModalOpen(true)}
          sx={{
            color: "text.secondary",
            fontSize: "0.75rem",
            textDecoration: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Datenschutz
        </Typography>
        <Typography
          sx={{
            color: "text.secondary",
            fontSize: "0.75rem",
          }}
        >
          •
        </Typography>
        <Impressum />
      </Box>
      <Typography
        sx={{
          color: "text.secondary",
          fontSize: "0.75rem",
          flex: 1,
          textAlign: "right",
        }}
      >
        v{packageJson.version}
      </Typography>

      <PrivacyPolicyModal
        open={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />
    </Box>
  );
}
