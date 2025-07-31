import { Box, Typography, Alert, Button, Paper } from "@mui/material";

interface HomePageProps {
  onLoadDemo: () => void;
  loading: boolean;
}

export function HomePage({ onLoadDemo, loading }: HomePageProps) {
  return (
    <Box
      component="section"
      sx={{
        mx: "auto",
        maxWidth: 1000,
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
        The relics are sorted using the same "Order Found" sorting as in-game,
        and you can use the line numbers on the left side of the table to easily
        locate them in your inventory.
      </Typography>

      <Paper sx={{ mb: 3, p: 2 }}>
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
      </Paper>

      <Paper sx={{ mb: 3, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Video Instructions
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
          Learn how to use the relic browser with this step-by-step video guide
        </Typography>
        <Box sx={{ textAlign: "center" }}>
          <Box
            component="video"
            controls
            preload="metadata"
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: 1,
              bgcolor: "black",
            }}
            border={1}
            borderColor={"grey.800"}
          >
            <source src="/instructions.webm" type="video/webm" />
            <source src="/instructions.mp4" type="video/mp4" />
            Your browser does not support the video tag. You can{" "}
            <Typography
              component="a"
              href="/instructions.webm"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "primary.main" }}
            >
              download the video
            </Typography>{" "}
            instead.
          </Box>
        </Box>
      </Paper>

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
