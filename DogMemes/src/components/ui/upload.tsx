"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Loader2, Upload, X, Link, Image, FileText } from "lucide-react";
import { Button } from "./button";

interface UploadProps {
  onUploadComplete?: (url: string, filename: string) => void;
  onUploadError?: (error: string) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
}

interface UploadedFile {
  url: string;
  filename: string;
  type: string;
}

export function FileUpload({
  onUploadComplete,
  onUploadError,
  accept,
  maxSize = 5 * 1024 * 1024, // 默认 5MB
}: UploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        setIsUploading(true);
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "上传失败");
        }

        const fileInfo = {
          url: data.url,
          filename: data.filename,
          type: file.type,
        };
        setUploadedFile(fileInfo);
        onUploadComplete?.(data.url, data.filename);
      } catch (error) {
        console.error("Upload error:", error);
        onUploadError?.(error instanceof Error ? error.message : "上传失败");
        setUploadedFile(null);
      } finally {
        setIsUploading(false);
      }
    },
    [onUploadComplete, onUploadError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple: false,
  });

  const clearUpload = () => {
    setUploadedFile(null);
  };

  const FilePreview = () => {
    if (!uploadedFile) return null;

    const isImage = uploadedFile.type.startsWith("image/");
    const fileName =
      uploadedFile.filename.split("-").pop() || uploadedFile.filename;

    return (
      <div className="mt-4 p-4 bg-muted/30 rounded-lg relative">
        <button
          onClick={clearUpload}
          className="absolute top-2 right-2 p-1 hover:bg-muted rounded-full"
          aria-label="清除上传"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-3">
          {isImage ? (
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted">
              <img
                src={uploadedFile.url}
                alt={fileName}
                className="object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{fileName}</p>
            <div className="flex items-center gap-2 mt-1">
              <a
                href={uploadedFile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                <Link className="h-3 w-3" />
                查看文件
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300 hover:border-gray-400"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2">
          <Upload className="h-8 w-8 text-gray-500" />
          {isUploading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>正在上传...</span>
            </div>
          ) : isDragActive ? (
            <p>将文件拖放到此处</p>
          ) : (
            <>
              <p className="text-sm text-gray-600">
                拖放文件到此处，或点击选择文件
              </p>
              <Button variant="outline" size="sm">
                选择文件
              </Button>
            </>
          )}
        </div>
      </div>
      <FilePreview />
    </div>
  );
}
