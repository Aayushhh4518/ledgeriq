import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";
import { SearchProvider } from "./SearchContext";
import CompareModal from "../CompareModal/CompareModal";

interface DashboardShellProps {
  children: React.ReactNode;
}

export default function DashboardShell({
  children,
}: DashboardShellProps) {
  return (
    <SearchProvider>
      <div className="min-h-screen bg-black text-white flex">
        <Sidebar />

        <div className="flex-1 flex flex-col w-full overflow-hidden">
          <TopHeader />

          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
        
        <CompareModal />
      </div>
    </SearchProvider>
  );
}