import { Box, Typography } from "@mui/material";
import { Impressum } from "./Impressum";

export function Footer() {
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
      <Impressum />
    </Box>
  );
}
