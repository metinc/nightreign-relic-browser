import React, { useState, useRef } from "react";
import {
  Button,
  Typography,
  styled,
  Stack,
  Modal,
  Box,
  IconButton,
  Snackbar,
  Alert,
  Link,
  AlertTitle,
  Paper,
} from "@mui/material";
import { CloudUpload, Close, FileUpload, Clear } from "@mui/icons-material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const DropZone = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isDragOver",
})<{ isDragOver: boolean }>(({ theme, isDragOver }) => ({
  border: `2px dashed ${
    isDragOver ? theme.palette.primary.main : theme.palette.divider
  }`,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(4),
  textAlign: "center",
  backgroundColor: isDragOver ? theme.palette.action.hover : "transparent",
  transition: "all 0.2s ease-in-out",
  cursor: "pointer",
  "&:hover": {
    borderColor: theme.palette.primary.main,
  },
}));

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 500 },
  maxHeight: "90vh",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
};

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  onClear?: () => void;
  loading?: boolean;
  hasFile?: boolean;
}

const SAVE_PATH_LINUX = [
  "~",
  ".steam",
  "steam",
  "steamapps",
  "compatdata",
  "2622380",
  "pfx",
  "drive_c",
  "users",
  "steamuser",
  "AppData",
  "Roaming",
  "Nightreign",
] as const;

const SAVE_PATH_WINDOWS = ["%APPDATA%", "Nightreign"] as const;

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  onClear,
  loading = false,
  hasFile = false,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showCopyToast, setShowCopyToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isLinux = navigator.userAgent.toLowerCase().includes("linux");
  const savePath = isLinux
    ? SAVE_PATH_LINUX.map((part) => <span key={part}>{part}/</span>)
    : SAVE_PATH_WINDOWS.map((part) => <span key={part}>{part}\</span>);

  const savePathString = isLinux
    ? SAVE_PATH_LINUX.join("/") + "/"
    : SAVE_PATH_WINDOWS.join("\\") + "\\";

  const handleCopyPath = async () => {
    try {
      await navigator.clipboard.writeText(savePathString);
      setShowCopyToast(true);
    } catch (err) {
      console.error("Failed to copy path to clipboard:", err);
    }
  };

  const getHelperText = () => {
    return (
      <>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
          <strong>Save file location:</strong>
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            fontFamily: "monospace",
            cursor: "pointer",
            "&:hover": {
              color: "primary.main",
              textDecoration: "underline",
            },
          }}
          onClick={handleCopyPath}
          title="Click to copy path to clipboard"
        >
          {savePath}
        </Typography>
      </>
    );
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
      setIsModalOpen(false);
    }
  };

  const handleFileSelect = (file: File) => {
    if (file.name.endsWith(".sl2")) {
      onFileSelect(file);
      setIsModalOpen(false);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      handleFileSelect(file);
    }
  };

  const handleDropZoneClick = () => {
    fileInputRef.current?.click();
  };

  const minWidth = 200;

  return (
    <>
      {hasFile ? (
        <Button
          variant="outlined"
          startIcon={<Clear />}
          disabled={loading}
          onClick={onClear}
          sx={{ minWidth, mt: 2 }}
        >
          Close Save File
        </Button>
      ) : (
        <Button
          variant="contained"
          startIcon={<CloudUpload />}
          loading={loading}
          onClick={() => setIsModalOpen(true)}
          sx={{ minWidth, mt: 2 }}
        >
          Open Save File
        </Button>
      )}

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="file-uploader-modal"
        aria-describedby="file-uploader-description"
      >
        <Box sx={modalStyle}>
          <Stack sx={{ gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6">Select Save File</Typography>
              <IconButton
                onClick={() => setIsModalOpen(false)}
                aria-label="close"
                disabled={loading}
              >
                <Close />
              </IconButton>
            </Box>

            <DropZone
              isDragOver={isDragOver}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleDropZoneClick}
            >
              <Stack sx={{ alignItems: "center", gap: 2 }}>
                <FileUpload sx={{ fontSize: 48, color: "text.secondary" }} />
                <Typography variant="h6" sx={{ color: "text.primary" }}>
                  Drop your .sl2 file here
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  or click to browse files
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<CloudUpload />}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Browse Files"}
                </Button>
              </Stack>
            </DropZone>

            <VisuallyHiddenInput
              ref={fileInputRef}
              type="file"
              accept=".sl2"
              onChange={handleFileChange}
            />

            <Paper variant="outlined" sx={{ p: 2 }}>
              {getHelperText()}
            </Paper>

            <Alert severity="info">
              <AlertTitle>Can't find your save file?</AlertTitle>
              You can download it from{" "}
              <Link
                href="https://store.steampowered.com/account/remotestorageapp/?appid=2622380"
                target="_blank"
              >
                Steam Cloud
              </Link>
            </Alert>
          </Stack>
        </Box>
      </Modal>

      <Snackbar
        open={showCopyToast}
        autoHideDuration={3000}
        onClose={() => setShowCopyToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowCopyToast(false)}
          severity="success"
          variant="filled"
        >
          Path copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
};
