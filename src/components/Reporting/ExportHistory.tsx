import { Clock, Download } from "lucide-react";

export default function ExportHistory() {
  // Mock recent reports to satisfy dashboard feel
  const history = [
    { type: "Executive Report", time: "10 mins ago", status: "Complete" },
    { type: "Full Intelligence Report", time: "2 hours ago", status: "Complete" },
    { type: "Risk Report", time: "1 day ago", status: "Complete" }
  ];

  return (
    <div className="bg-[#0a0a0a] border border-zinc-800 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-indigo-400" />
        <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">Export History</h2>
      </div>
      
      <div className="space-y-3">
        {history.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-zinc-900 border border-zinc-800 rounded">
            <div>
              <p className="text-sm text-zinc-200">{item.type}</p>
              <p className="text-xs text-zinc-500">{item.time}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">{item.status}</span>
              <button className="p-1.5 hover:bg-zinc-800 rounded text-zinc-400 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
