"use client";

import { useState } from "react";

export default function UploadZone() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="border rounded-lg p-8">
      <h2 className="text-xl font-semibold mb-4">
        Upload Financial Statement
      </h2>

      <input
        type="file"
        accept=".pdf"
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
    </div>
  );
}