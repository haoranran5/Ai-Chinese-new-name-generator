"use client";

import { ReactNode, useState } from "react";
import { Sidebar as SidebarType } from "@/types/blocks/sidebar";
import Sidebar from "@/components/admin/dashboard/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  sidebar: SidebarType;
}

export default function DashboardLayout({
  children,
  sidebar,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} sidebar={sidebar} />
      <main
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <div className="p-8 max-w-7xl mx-auto dark:text-gray-100">
          {children}
        </div>
      </main>
    </div>
  );
}
