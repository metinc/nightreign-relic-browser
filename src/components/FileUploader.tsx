import React from "react";
import { Button, Typography, styled, Stack } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";

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

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  fileName?: string;
  loading?: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  fileName,
  loading = false,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <Stack sx={{ alignItems: "center", gap: 2 }}>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUpload />}
        disabled={loading}
      >
        {loading ? "Loading..." : "Open Save File"}
        <VisuallyHiddenInput
          type="file"
          accept=".sl2"
          onChange={handleFileChange}
        />
      </Button>

      {fileName && (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          File: {fileName}
        </Typography>
      )}
    </Stack>
  );
};
