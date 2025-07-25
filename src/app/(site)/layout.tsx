import { Sidebar } from "@/components";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "./components/header";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar />
      <main className="w-full bg-accent">
        <Header />

        <section className="px-6 py-4">{children}</section>
      </main>
    </SidebarProvider>
  );
}
