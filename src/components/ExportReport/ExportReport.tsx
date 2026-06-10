interface ExportReportProps {
  company: string;
}

export default function ExportReport({
  company,
}: ExportReportProps) {

  const handleExport = () => {
    window.print();
  };

  return (
    <div className="border rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">
        Export Report
      </h2>

      <p className="mb-4">
        Download a printable analysis report for {company}.
      </p>

      <button
        onClick={handleExport}
        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
      >
        Export PDF
      </button>
    </div>
  );
}