import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";
import { SearchProvider } from "./SearchContext";
import CompareModal from "../CompareModal/CompareModal";
import DebugPanelWrapper from "../ExtractionDebugPanel/DebugPanelWrapper";
import MetricDrillDownModal from "../ui/MetricDrillDownModal";

interface DashboardShellProps {
  children: React.ReactNode;
}

export default function DashboardShell({
  children,
}: DashboardShellProps) {
  return (
    <SearchProvider>
      <div className="min-h-screen bg-[#0a0a0a] text-white flex relative">
        {/* Background Depth Elements */}
        <div className="absolute inset-0 bg-dot-white/[0.05] z-0 pointer-events-none" />
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex justify-center items-center">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-600/10 blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-600/10 blur-[120px] mix-blend-screen" />
        </div>
        
        <div className="relative z-10 flex w-full">
          <Sidebar />

          <div className="flex-1 flex flex-col w-full overflow-hidden">
            <TopHeader />

            <div className="flex-1 overflow-y-auto">
              {children}
            </div>
          </div>
          
          <CompareModal />
          <DebugPanelWrapper />
          <MetricDrillDownModal />
        </div>
      </div>
    </SearchProvider>
  );
}