import { Box, Typography, Alert, Button } from "@mui/material";

interface IntroductionProps {
  onLoadDemo: () => void;
  loading: boolean;
}

export function Introduction({ onLoadDemo, loading }: IntroductionProps) {
  return (
    <Box
      component="section"
      sx={{
        mx: "auto",
        maxWidth: 756,
        px: 3,
        py: 4,
        textAlign: "center",
      }}
    >
      <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
        This tool helps you browse and filter all relics stored in your Elden
        Ring Nightreign save file (.sl2). Unlike the limited in-game filtering
        options, this browser allows you to search and filter your entire relic
        collection with powerful tools to find exactly what you're looking for.
      </Typography>

      <Box sx={{ mb: 3, p: 2, bgcolor: "action.hover", borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>
          Features
        </Typography>
        <Typography component="ul" sx={{ textAlign: "left", pl: 2 }}>
          <li>Browse all relics across multiple character slots</li>
          <li>Search relics by name or effect</li>
          <li>Filter relics by color</li>
          <li>View detailed relic information and effects</li>
          <li>Fast and responsive interface</li>
        </Typography>
      </Box>

      <Alert severity="info" sx={{ mb: 3, textAlign: "left" }}>
        <Typography variant="body2">
          <strong>Safe & Secure:</strong> This tool only reads your save file
          data. It never modifies or manipulates your save file in any way. Your
          game progress is completely safe.
        </Typography>
      </Alert>

      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        To get started, click "Open Save File" above and select your Elden Ring
        Nightreign save file (.sl2). Need help or have questions? Join our{" "}
        <Typography
          component="a"
          href="https://discord.gg/XUMJrhqyhw"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "primary.main",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Discord community
        </Typography>{" "}
        to get in touch with the developer and other users.
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Button
          variant="outlined"
          onClick={onLoadDemo}
          disabled={loading}
          sx={{
            textTransform: "none",
            px: 3,
            py: 1,
          }}
        >
          Try Demo Data
        </Button>
        <Typography
          variant="caption"
          sx={{
            display: "block",
            mt: 1,
            color: "text.secondary",
            textAlign: "center",
          }}
        >
          Load sample relics to explore the interface
        </Typography>
      </Box>
    </Box>
  );
}
