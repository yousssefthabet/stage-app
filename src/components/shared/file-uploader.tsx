"use client";

import React, { useRef, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import type { FilePondInitialFile } from "filepond";

import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

interface FileUploaderProps {
  initialFiles?: (File | FilePondInitialFile | Blob | string)[];
  onUpdateFiles?: (files: File[]) => void;
  allowMultiple?: boolean;
  maxFiles?: number;
  server?: string | object;
  acceptedFileTypes?: string[];
  name?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  initialFiles = [],
  onUpdateFiles,
  allowMultiple = true,
  maxFiles = 3,
  server,
  acceptedFileTypes,
  name = "files",
}) => {
  const pondRef = useRef<FilePond | null>(null);
  const [files, setFiles] =
    useState<(string | Blob | FilePondInitialFile)[]>(initialFiles);

  return (
    <div className="file-uploader">
      <FilePond
        ref={pondRef}
        files={files}
        allowMultiple={allowMultiple}
        maxFiles={maxFiles}
        server={server}
        name={name}
        acceptedFileTypes={acceptedFileTypes}
        onupdatefiles={(fileItems) => {
          const updated = fileItems.map((item) => item.file as File);
          setFiles(fileItems.map((item) => item.file));
          onUpdateFiles?.(updated);
        }}
      />
    </div>
  );
};

export default FileUploader;
