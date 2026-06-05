"use client";

import { useState } from "react";

interface UploadResponse {
  fileName: string;
  fileSize: number;
  fileType: string;
  textLength?: number;
  textPreview?: string;
}

export default function UploadZone() {
  const [file, setFile] = useState<File | null>(null);
  const [responseData, setResponseData] = useState<UploadResponse | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF file first.");
      return;
    }

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as UploadResponse;

      console.log("Upload Response:", data);

      setResponseData(data);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="border rounded-lg p-8">
      <h2 className="text-xl font-semibold mb-4">Upload Financial Statement</h2>

      <input
        type="file"
        accept=".pdf"
        suppressHydrationWarning
        onChange={(e) => {
          const selectedFile = e.target.files?.[0];

          if (selectedFile) {
            setFile(selectedFile);
          }
        }}
      />

      {file && (
        <p className="mt-4">
          Selected: {file.name}
        </p>
      )}

      <button
        onClick={handleUpload}
        disabled={isUploading}
        className="mt-4 border px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
      >
        {isUploading ? "Uploading..." : "Upload PDF"}
      </button>

      {responseData && (
        <div className="mt-6 border rounded p-4">
          <h3 className="font-semibold mb-2">
            Extraction Result
          </h3>

          <p>
            <strong>File:</strong>{" "}
            {responseData.fileName}
          </p>

          <p>
            <strong>Characters Extracted:</strong>{" "}
            {responseData.textLength}
          </p>

          <div className="mt-4">
            <h4 className="font-semibold mb-2">
              Preview
            </h4>

            <pre className="whitespace-pre-wrap text-sm">
              {responseData.textPreview}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}