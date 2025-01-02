import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/app-sidebar";
import { Outlet } from 'react-router';

export default function MainLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <header className="p-4 bg-white flex flex-row gap-x-2 shadow-sm items-center">
          <SidebarTrigger />
          Redball Studio Admin
        </header>
        <main className="p-4 pt-0 mx-auto w-full min-h-screen bg-[#f4f4f4]">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
