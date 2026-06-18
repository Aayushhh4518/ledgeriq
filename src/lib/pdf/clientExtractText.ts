"use client";

import * as pdfjsLib from 'pdfjs-dist';

// Use standard Next.js Webpack 5 compatible worker loader
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

export async function extractTextFromPDFFile(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  
  // Load the PDF document
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  
  let fullText = '';
  
  // Iterate through all pages
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    
    // Extract text strings
    const pageText = content.items
      .map((item: any) => item.str)
      .join(' ');
      
    fullText += pageText + '\n';
  }
  
  return fullText;
}
