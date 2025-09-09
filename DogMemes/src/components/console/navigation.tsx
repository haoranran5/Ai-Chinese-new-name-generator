import { Sidebar as SidebarType } from "@/types/siderbar";
import ConsoleSidebar from "@/components/console/sidebar";
import { Navbar } from "@/components/blocks/navbar";

export function NavigationWrapper({
  sidebar,
  isSidebarOpen,
}: {
  sidebar: SidebarType;
  isSidebarOpen: boolean;
}) {
  return (
    <>
      <Navbar />
      <div
        className={`fixed left-0 top-16 bottom-0 w-64 transition-transform duration-300 z-30
                     ${
                       isSidebarOpen
                         ? "translate-x-0"
                         : "-translate-x-full md:translate-x-0"
                     }`}
      >
        <ConsoleSidebar sidebar={sidebar} />
      </div>
    </>
  );
}
