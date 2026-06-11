import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Captures an HTML element and downloads it as a PDF.
 * @param element The HTML element to capture.
 * @param fileName The name of the downloaded PDF file.
 */
export async function exportToPDF(element: HTMLElement, fileName: string = "LedgerIQ_Report.pdf") {
  // Add a slight delay to ensure any layout shifts or animations finish
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const canvas = await html2canvas(element, {
    scale: 2, // higher resolution
    useCORS: true,
    backgroundColor: "#000000",
    windowWidth: 1200, // lock width for consistent rendering
  });

  const imgData = canvas.toDataURL("image/jpeg", 1.0);
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  let position = 0;
  let heightLeft = pdfHeight;
  const pageHeight = pdf.internal.pageSize.getHeight();

  // First page
  pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, pdfHeight);
  heightLeft -= pageHeight;

  // Add new pages if the content is taller than A4
  while (heightLeft >= 0) {
    position = heightLeft - pdfHeight;
    pdf.addPage();
    pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, pdfHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(fileName);
}
