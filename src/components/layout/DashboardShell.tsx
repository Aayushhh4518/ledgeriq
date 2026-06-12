import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";
import { SearchProvider } from "./SearchContext";
import CompareModal from "../CompareModal/CompareModal";
import DebugPanelWrapper from "../ExtractionDebugPanel/DebugPanelWrapper";

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
        <div className="absolute inset-0 bg-dot-white/[0.15] z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 z-0 pointer-events-none" />
        
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
        </div>
      </div>
    </SearchProvider>
  );
}