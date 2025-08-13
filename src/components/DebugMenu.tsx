import React, { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Chip,
  Alert,
} from "@mui/material";
import {
  BugReport as DebugIcon,
  Download as DownloadIcon,
  Folder as FolderIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import type { BND4Entry } from "../types/SaveFile";

interface DebugMenuProps {
  bnd4Entries?: BND4Entry[];
  disabled?: boolean;
}

export const DebugMenu: React.FC<DebugMenuProps> = ({
  bnd4Entries,
  disabled = false,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const downloadEntry = (
    entry: BND4Entry,
    type: "raw" | "encrypted" | "decrypted"
  ) => {
    let data: Uint8Array;
    let filename: string;

    switch (type) {
      case "raw":
        data = entry.rawData;
        filename = `${entry.name}_raw.bin`;
        break;
      case "encrypted":
        data = entry.encryptedData;
        filename = `${entry.name}_encrypted.bin`;
        break;
      case "decrypted":
        data = entry.cleanData;
        filename = `${entry.name}_decrypted.bin`;
        break;
      default:
        return;
    }

    // Create blob and download
    const blob = new Blob([data], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    handleClose();
  };

  const downloadAllDecrypted = () => {
    if (!bnd4Entries) return;

    // Create a zip-like structure by downloading each entry
    bnd4Entries.forEach((entry, index) => {
      setTimeout(() => {
        downloadEntry(entry, "decrypted");
      }, index * 100); // Stagger downloads to avoid browser blocking
    });

    handleClose();
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (!bnd4Entries || bnd4Entries.length === 0) {
    return null;
  }

  return (
    <>
      <IconButton
        onClick={handleClick}
        disabled={disabled}
        size="small"
        sx={{
          color: "orange",
          "&:hover": {
            backgroundColor: "rgba(255, 152, 0, 0.04)",
          },
        }}
        title="Debug Menu - Download Decrypted Entries"
      >
        <DebugIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <Box sx={{ px: 2, py: 1 }}>
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <DebugIcon color="primary" />
            Debug Menu
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Download individual decrypted BND4 entries
          </Typography>
        </Box>

        <Divider />

        <MenuItem onClick={downloadAllDecrypted}>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText
            primary="Download All Decrypted"
            secondary={`${bnd4Entries.length} entries`}
          />
        </MenuItem>

        <Divider />

        {bnd4Entries.length > 10 && (
          <Box sx={{ px: 2, py: 1 }}>
            <Alert severity="info" sx={{ fontSize: "0.75rem" }}>
              Showing {bnd4Entries.length} entries. Downloads will be staggered.
            </Alert>
          </Box>
        )}

        {bnd4Entries.map((entry, index) => (
          <MenuItem
            key={index}
            sx={{
              flexDirection: "column",
              alignItems: "stretch",
              py: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" fontWeight="medium">
                  {entry.name}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
                  <Chip
                    label={`Entry ${entry.index}`}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: "0.6rem", height: "16px" }}
                  />
                  <Chip
                    label={formatBytes(entry.cleanData.length)}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: "0.6rem", height: "16px" }}
                  />
                  {entry.decrypted && (
                    <Chip
                      label="Decrypted"
                      size="small"
                      color="success"
                      sx={{ fontSize: "0.6rem", height: "16px" }}
                    />
                  )}
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 0.5 }}>
                <IconButton
                  size="small"
                  onClick={() => downloadEntry(entry, "raw")}
                  title="Download Raw Data"
                  sx={{ fontSize: "0.7rem" }}
                >
                  <DownloadIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => downloadEntry(entry, "encrypted")}
                  title="Download Encrypted Data"
                  sx={{ fontSize: "0.7rem" }}
                >
                  <DownloadIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => downloadEntry(entry, "decrypted")}
                  title="Download Decrypted Data"
                  sx={{ fontSize: "0.7rem", color: "primary.main" }}
                >
                  <DownloadIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </MenuItem>
        ))}

        <Divider />

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <CloseIcon />
          </ListItemIcon>
          <ListItemText primary="Close" />
        </MenuItem>
      </Menu>
    </>
  );
};
