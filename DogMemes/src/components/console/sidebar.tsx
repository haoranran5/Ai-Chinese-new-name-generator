"use client";

import { Sidebar } from "@/types/siderbar";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import DynamicIcon from "@/components/console/dynamic-icon";

interface ConsoleSidebarProps {
  sidebar: Sidebar;
}

export default function ConsoleSidebar({ sidebar }: ConsoleSidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className="w-full bg-card border-r border-border
                min-h-[calc(100vh-64px)] shadow-sm dark:shadow-none
                sticky top-16 rounded-r-xl transition-shadow z-20"
    >
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
          User Console
        </h2>
      </div>

      <nav className="mt-2 pb-20 md:pb-4">
        {sidebar.nav.items.map((item, index) => {
          const isActive = item.is_active || pathname === item.url;

          return (
            <Link
              key={index}
              href={item.url}
              className={`flex items-center px-4 py-3 text-sm ${
                isActive
                  ? "bg-primary/10 dark:bg-primary/20 text-primary border-l-4 border-primary"
                  : "text-gray-700 dark:text-gray-300 hover:bg-primary/5 dark:hover:bg-primary/10"
              }`}
            >
              {item.icon && (
                <DynamicIcon
                  name={item.icon}
                  className={`mr-3 h-5 w-5 ${
                    isActive
                      ? "text-primary"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                />
              )}
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
