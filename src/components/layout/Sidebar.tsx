export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen border-r border-zinc-800 p-6">
      <h1 className="text-2xl font-bold mb-8">
        LedgerIQ
      </h1>

      <nav className="space-y-4">
        <div className="cursor-pointer hover:text-blue-400">
          Dashboard
        </div>

        <div className="cursor-pointer hover:text-blue-400">
          Financial Analysis
        </div>

        <div className="cursor-pointer hover:text-blue-400">
          Risk Analysis
        </div>

        <div className="cursor-pointer hover:text-blue-400">
          Growth Analysis
        </div>

        <div className="cursor-pointer hover:text-blue-400">
          AI Insights
        </div>

        <div className="cursor-pointer hover:text-blue-400">
          Reports
        </div>
      </nav>
    </aside>
  );
}