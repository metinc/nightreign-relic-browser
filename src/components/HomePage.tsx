import { Box, Typography, Alert, Button, Paper, Grid } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface HomePageProps {
  onLoadDemo: () => void;
  loading: boolean;
}

export function HomePage({ onLoadDemo, loading }: HomePageProps) {
  const [showOverlay, setShowOverlay] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Set up video event listeners
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoEnded = () => {
      window.dataLayer.push({
        event: "tutorial_complete",
      });
    };

    video.addEventListener("ended", handleVideoEnded);

    // Cleanup event listener on component unmount
    return () => {
      video.removeEventListener("ended", handleVideoEnded);
    };
  }, []);

  const handlePlayVideo = () => {
    setShowOverlay(false);
    if (videoRef.current) {
      videoRef.current.play();
    }

    window.dataLayer.push({
      event: "tutorial_begin",
    });
  };
  return (
    <Box
      component="section"
      sx={{
        mx: "auto",
        maxWidth: 1200,
        px: 3,
        py: 4,
      }}
    >
      <Grid container spacing={3}>
        <Grid size={12}>
          <Typography
            variant="body1"
            sx={{ mb: 3, lineHeight: 1.6, textAlign: "center" }}
          >
            This tool helps you browse and filter all relics stored in your
            Elden Ring Nightreign save file (.sl2). Unlike the limited in-game
            filtering options, this browser allows you to search and filter your
            entire relic collection with powerful tools to find exactly what
            you're looking for. The relics are sorted using the same "Order
            Found" sorting as in-game, and you can use the line numbers on the
            left side of the table to easily locate them in your inventory.
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Paper sx={{ p: 2, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Features
            </Typography>
            <Typography component="ul" sx={{ pl: 2 }}>
              <li>Browse all relics across multiple character slots</li>
              <li>Search relics by name or effect</li>
              <li>Filter relics by color</li>
              <li>View detailed relic information and effects</li>
              <li>Fast and responsive interface</li>
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Paper
            sx={{
              p: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Demo
            </Typography>
            <Typography sx={{ mb: 2 }}>
              Load sample relics to explore the interface
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
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
            </Box>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 2, height: "100%" }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Video Instructions
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
              Learn how to use the relic browser with this step-by-step video
              guide
            </Typography>
            <Box sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  position: "relative",
                  display: "inline-block",
                  width: "100%",
                }}
              >
                <Box
                  component="video"
                  ref={videoRef}
                  controls={!showOverlay}
                  preload="metadata"
                  poster="/instructions_thumb.jpg"
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

                {showOverlay && (
                  <Box
                    onClick={handlePlayVideo}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      cursor: "pointer",
                      borderRadius: 1,
                      transition: "background-color 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        py: 2,
                        borderTop: "1px solid white",
                        borderBottom: "1px solid white",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        position: "absolute",
                        top: "33%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        right: 0,
                        display: { xs: "none", md: "block" },
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          letterSpacing: "0.1em",
                          textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                          lineHeight: 1,
                          position: "relative",
                          top: "0.1em",
                        }}
                      >
                        HOW TO USE
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <PlayArrowIcon
                        sx={{
                          fontSize: "4rem",
                          color: "white",
                          opacity: 0.9,
                        }}
                      />
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid size={12}>
          <Alert severity="info" sx={{ textAlign: "left" }}>
            <Typography variant="body2">
              <strong>Safe & Secure:</strong> This tool only reads your save
              file data. It never modifies or manipulates your save file in any
              way. Your game progress is completely safe.
            </Typography>
          </Alert>
        </Grid>

        <Grid size={12}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
              To get started, click "Open Save File" above and select your Elden
              Ring Nightreign save file (.sl2). Need help or have questions?
              Join our{" "}
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
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
