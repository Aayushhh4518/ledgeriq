import UploadZone from "@/components/UploadZone/UploadZone";
import DashboardShell from "@/components/layout/DashboardShell";

export default function Home() {
  return (
    <DashboardShell>
      <main className="p-10">
        <UploadZone />
      </main>
    </DashboardShell>
  );
}