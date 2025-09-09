export interface NavItem {
  title: string;
  url: string;
  icon?: string;
  target?: string;
  children?: NavItem[];
}

export interface NavigationConfig {
  brand: {
    title: string;
    logo: {
      src: string;
      alt: string;
    };
  };
  admin: {
    mainNav: NavItem[];
    socialNav: NavItem[];
  };
  user: {
    mainNav: NavItem[];
    socialNav: NavItem[];
  };
}

export const navigationConfig: NavigationConfig = {
  brand: {
    title: process.env.NEXT_PUBLIC_BRAND_NAME || "Raven",
    logo: {
      src: "/logo.png",
      alt: process.env.NEXT_PUBLIC_BRAND_NAME || "Raven",
    },
  },
  admin: {
    mainNav: [
      {
        title: "Users",
        url: "/admin/users",
        icon: "RiUserLine",
      },
      {
        title: "Orders",
        icon: "RiOrderPlayLine",
        url: "/admin/orders",
      },
      {
        title: "Blog",
        url: "/admin/posts",
        icon: "RiBookLine",
      },
      {
        title: "Affiliate",
        url: "/admin/affiliates",
        icon: "RiTeamLine",
      },
    ],
    socialNav: [
      {
        title: "Home",
        url: "/",
        target: "_blank",
        icon: "RiHomeLine",
      },
      {
        title: "Github",
        url: "https://github.com/",
        target: "_blank",
        icon: "RiGithubLine",
      },
      {
        title: "Discord",
        url: "https://discord.gg/",
        target: "_blank",
        icon: "RiDiscordLine",
      },
      {
        title: "X",
        url: "https://x.com/1111",
        target: "_blank",
        icon: "RiTwitterLine",
      },
    ],
  },
  user: {
    mainNav: [
      {
        title: "My Orders",
        url: "/users/my-orders",
        icon: "RiOrderPlayLine",
      },
      {
        title: "My Invites",
        url: "/users/my-invites",
        icon: "RiTeamLine",
      },
      {
        title: "My Profile",
        url: "/users/profile",
        icon: "RiUserLine",
      },
    ],
    socialNav: [],
  },
};
