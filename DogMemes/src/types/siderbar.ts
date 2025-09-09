export interface SidebarItem {
  title: string;
  url: string;
  icon?: string;
  is_active?: boolean;
}

export interface SidebarNav {
  items: SidebarItem[];
}

export interface Sidebar {
  nav: SidebarNav;
}
