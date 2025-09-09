export interface SidebarBrand {
  title: string;
  logo?: {
    src: string;
    alt: string;
  };
}

export interface SidebarNavItem {
  title: string;
  url?: string;
  icon?: string;
  is_expand?: boolean;
  children?: Omit<SidebarNavItem, "children">[];
}

export interface SidebarNav {
  items: SidebarNavItem[];
}

export interface SidebarSocialItem {
  title: string;
  url: string;
  target?: string;
  icon?: string;
}

export interface SidebarSocial {
  items: SidebarSocialItem[];
}

export interface Sidebar {
  brand: SidebarBrand;
  nav: SidebarNav;
  social?: SidebarSocial;
}
