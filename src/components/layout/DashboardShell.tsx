import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";

interface DashboardShellProps {
  children: React.ReactNode;
}

export default function DashboardShell({
  children,
}: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar />

      <div className="flex-1">
        <TopHeader />

        {children}
      </div>
    </div>
  );
}