export default function TopHeader() {
  return (
    <div className="border-b border-zinc-800 px-8 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">
          Financial Statement Analyzer
        </h1>

        <p className="text-zinc-400 text-sm">
          AI Powered Financial Intelligence Platform
        </p>
      </div>

      <div className="flex gap-3">
        <button className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700">
          Export Report
        </button>

        <button className="px-4 py-2 rounded border border-zinc-700">
          Compare
        </button>
      </div>
    </div>
  );
}