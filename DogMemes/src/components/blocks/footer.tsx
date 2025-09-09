"use client";

import Link from "next/link";
import { Github, Twitter, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  const aboutLinks = [
    { name: t("links.product.features"), href: "#features" },
    { name: t("links.product.pricing"), href: "#pricing" },
  ];

  const resourceLinks = [
    { name: t("links.resources.blog"), href: "/blog" },
    { name: t("links.resources.docs"), href: "/docs" },
  ];

  const friendLinks = [
    { name: process.env.NEXT_PUBLIC_BRAND_NAME || "RavenSaaS", href: process.env.NEXT_PUBLIC_WEBSITE_URL, external: true },
  ];

  const legalLinks = [
    { name: t("links.legal.privacy"), href: "/privacy" },
    { name: t("links.legal.terms"), href: "/terms" },
  ];

  const socialLinks = [
    { name: "GitHub", href: "https://github.com", icon: Github },
    { name: "Twitter", href: "https://twitter.com", icon: Twitter },
    {
      name: t("links.social.email"),
      href: "mailto:hello@raven.com",
      icon: Mail,
    },
  ];


  return (
    <footer className="bg-gray-900 dark:bg-black">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* 主要内容 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* 品牌信息 */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <img src="/logo.png" alt="Logo" width={32} height={32} />
              </div>
              <span className="text-xl font-bold text-white">{process.env.NEXT_PUBLIC_BRAND_NAME || "RavenSaaS"}</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {process.env.NEXT_PUBLIC_BRAND_NAME || "RavenSaaS"} {t("description")}
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors duration-200 group"
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  <social.icon className="h-5 w-5 text-gray-400 group-hover:text-white" />
                </Link>
              ))}
            </div>
          </div>

          {/* 关于 */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("categories.product")}</h3>
            <ul className="space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 资源 */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("categories.resources")}</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 友情链接 */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("categories.company")}</h3>
            <ul className="space-y-3">
              {friendLinks.map((link) => (
                <li key={link.name}>
                  <Link   
                    href={link.href || ""}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 分隔线 */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4">
            {/* 版权信息和法律链接 */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-gray-400 text-sm">
              <span>{t("copyright", { 
    brandName: process.env.NEXT_PUBLIC_BRAND_NAME || "RavenSaaS" 
  })}</span>
              <span className="text-gray-600">·</span>
              {legalLinks.map((link, index) => (  
                <span key={link.name} className="flex items-center gap-2">
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                  {index < legalLinks.length - 1 && (
                    <span className="text-gray-600">·</span>
                  )}
                </span>
              ))}
            </div>

            {/* 服务条款 */}
            {/* <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>服务条款</span>
            </div> */}
          </div>
        </div>

        {/* 徽章区域 */}
        {/* <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <div className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-400">
            监控您的域名评级
          </div>
          <div className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-400">
            Peerlist 徽章
          </div>
          <div className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-400">
            Open-Launch 每日前2名获奖者
          </div>
          <div className="px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-400">
            最佳 SaaS 样板代码认证徽章
          </div>
        </div> */}
      </div>
    </footer>
  );
}
