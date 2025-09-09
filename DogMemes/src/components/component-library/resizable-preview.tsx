"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Copy,
  Check,
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
} from "lucide-react";
import ResizableLayout from "@/components/layout/ResizableLayout";

interface ResizablePreviewProps {
  title: string;
  componentId: string;
}

const presetSizes = [
  {
    name: "Desktop",
    icon: Monitor,
    width: "100%",
    height: "800px",
    widthPx: null,
  },
  {
    name: "Tablet",
    icon: Tablet,
    width: "820px",
    height: "800px",
    widthPx: 820,
  },
  {
    name: "Mobile",
    icon: Smartphone,
    width: "390px",
    height: "800px",
    widthPx: 390,
  },
];

// 从 CodeViewer 中导入代码数据
const componentCodes = {
  hero: `import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  return (
    <div className="bg-white dark:bg-gray-900 p-8 md:p-12 text-center">
      <div className="w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto space-y-6 md:space-y-8">
        <Badge variant="secondary" className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-0.5 md:px-4 md:py-1">
          2025 🎉 新年快乐
        </Badge>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
          一小时快速上线 AI SaaS 项目，如此高效优雅。
        </h1>
        
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-xl md:max-w-2xl mx-auto leading-relaxed">
          RavenSaas 是一个用于构建 AI SaaS 创业项目的 NextJS 模板。
          通过丰富的模板和组件快速启动。
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
          <Button className="w-full sm:w-auto bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 px-6 md:px-8 py-2.5 md:py-3 text-base md:text-lg">
            ⚡ 立即开始
          </Button>
          <Button variant="outline" className="w-full sm:w-auto px-6 md:px-8 py-2.5 md:py-3 text-base md:text-lg">
            📖 阅读文档
          </Button>
        </div>
        
        <p className="text-orange-600 dark:text-orange-400 font-medium">
          🔥 前 1000 名用户立减 ¥800
        </p>
        
        <div className="flex flex-col items-center gap-3 md:gap-4">
          <div className="flex -space-x-1 sm:-space-x-2">
            {["👤", "👤", "👤", "👤", "👤"].map((avatar, index) => (
              <div
                key={index}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center text-base sm:text-lg bg-gray-200 dark:bg-gray-700"
              >
                {avatar}
              </div>
            ))}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white dark:border-gray-900 flex items-center justify-center text-xs bg-blue-500 text-white">
              blank
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">★★★★★</div>
            <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
              from 250+ happy users
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}`,
  feature: `import { Zap, Shield, Globe } from "lucide-react"

export function FeatureSection() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-12">
      <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            强大的功能特性
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            我们提供全面的解决方案，帮助您快速构建和部署现代化的应用程序
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              快速部署
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              一键部署到云端，支持自动扩容和负载均衡，让您的应用始终保持高可用性
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              安全可靠
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              企业级安全保障，数据加密传输，多重身份验证，保护您的数据安全
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              全球覆盖
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              全球CDN加速，多地域部署，为用户提供极致的访问体验
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}`,
  stats: `import { Users, BarChart3, TrendingUp, Globe } from "lucide-react"

export function StatsSection() {
  return (
    <div className="bg-white dark:bg-gray-900 p-12">
      <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            数据说话
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            我们的成绩单，见证我们的成长
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">10K+</div>
            <div className="text-gray-600 dark:text-gray-400">活跃用户</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">99.9%</div>
            <div className="text-gray-600 dark:text-gray-400">服务可用性</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">150%</div>
            <div className="text-gray-600 dark:text-gray-400">年增长率</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Globe className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">50+</div>
            <div className="text-gray-600 dark:text-gray-400">覆盖国家</div>
          </div>
        </div>
      </div>
    </div>
  )
}`,
  pricing: `import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export function PricingSection() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-12">
      <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            选择适合您的方案
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            灵活的定价方案，满足不同规模的需求
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* 基础版 */}
          <Card className="relative">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">基础版</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">¥99</span>
                  <span className="text-gray-600 dark:text-gray-400">/月</span>
                </div>
                <ul className="space-y-3 mb-6 text-sm text-gray-600 dark:text-gray-400">
                  <li>✓ 5个项目</li>
                  <li>✓ 基础组件库</li>
                  <li>✓ 邮件支持</li>
                </ul>
                <Button variant="outline" className="w-full">选择基础版</Button>
              </div>
            </CardContent>
          </Card>

          {/* 专业版 */}
          <Card className="relative border-2 border-blue-500">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-blue-500 text-white">推荐</Badge>
            </div>
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">专业版</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">¥299</span>
                  <span className="text-gray-600 dark:text-gray-400">/月</span>
                </div>
                <ul className="space-y-3 mb-6 text-sm text-gray-600 dark:text-gray-400">
                  <li>✓ 无限项目</li>
                  <li>✓ 完整组件库</li>
                  <li>✓ 优先支持</li>
                  <li>✓ 高级模板</li>
                </ul>
                <Button className="w-full">选择专业版</Button>
              </div>
            </CardContent>
          </Card>

          {/* 企业版 */}
          <Card className="relative">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">企业版</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">¥999</span>
                  <span className="text-gray-600 dark:text-gray-400">/月</span>
                </div>
                <ul className="space-y-3 mb-6 text-sm text-gray-600 dark:text-gray-400">
                  <li>✓ 无限项目</li>
                  <li>✓ 定制组件</li>
                  <li>✓ 专属客服</li>
                  <li>✓ 私有部署</li>
                </ul>
                <Button variant="outline" className="w-full">联系销售</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}`,
  cta: `import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-12">
      <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          准备好开始了吗？
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          加入数千名开发者的行列，使用我们的平台构建下一个伟大的产品
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
            免费开始
          </Button>
          <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
            联系销售
          </Button>
        </div>
        <p className="text-blue-100 text-sm mt-4">
          无需信用卡 • 14天免费试用 • 随时取消
        </p>
      </div>
    </div>
  )
}`,
  footer: `import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Github } from "lucide-react"

export function Footer() {
  return (
    <div className="bg-gray-900 text-white p-12">
      <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-4xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-bold">Raven</span>
            </div>
            <p className="text-gray-400 mb-4">
              构建现代化应用的最佳选择，让开发变得更简单。
            </p>
            <div className="flex gap-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Github className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">产品</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">功能特性</a></li>
              <li><a href="#" className="hover:text-white">定价方案</a></li>
              <li><a href="#" className="hover:text-white">API文档</a></li>
              <li><a href="#" className="hover:text-white">更新日志</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">支持</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">帮助中心</a></li>
              <li><a href="#" className="hover:text-white">联系我们</a></li>
              <li><a href="#" className="hover:text-white">状态页面</a></li>
              <li><a href="#" className="hover:text-white">社区论坛</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">联系信息</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>hello@raven.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+86 400-123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>北京市朝阳区</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Raven. 保留所有权利。
          </p>
          <div className="flex gap-6 text-sm text-gray-400 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">隐私政策</a>
            <a href="#" className="hover:text-white">服务条款</a>
            <a href="#" className="hover:text-white">Cookie政策</a>
          </div>
        </div>
      </div>
    </div>
  )
}`,
  table: `import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, User } from "lucide-react"

export function DataTable() {
  const users = [
    { name: "张三", email: "zhangsan@example.com", status: "活跃", role: "管理员" },
    { name: "李四", email: "lisi@example.com", status: "活跃", role: "用户" },
    { name: "王五", email: "wangwu@example.com", status: "禁用", role: "用户" },
  ]

  return (
    <div className="bg-white dark:bg-gray-900 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">用户列表</h3>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="搜索用户..." className="pl-10 w-64" />
          </div>
          <Button size="sm">添加用户</Button>
        </div>
      </div>
      
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                用户
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                状态
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                角色
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-500" />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant={user.status === "活跃" ? "default" : "secondary"}>
                    {user.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                  {user.role}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Button variant="ghost" size="sm">编辑</Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">删除</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}`,
  form: `import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function SignupForm() {
  return (
    <div className="bg-white dark:bg-gray-900 p-6">
      <Card className="max-w-md mx-auto">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">创建新账户</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                用户名
              </label>
              <Input placeholder="请输入用户名" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                邮箱地址
              </label>
              <Input type="email" placeholder="请输入邮箱地址" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                密码
              </label>
              <Input type="password" placeholder="请输入密码" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                确认密码
              </label>
              <Input type="password" placeholder="请再次输入密码" />
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                我同意 <a href="#" className="text-blue-600 hover:underline">服务条款</a> 和 <a href="#" className="text-blue-600 hover:underline">隐私政策</a>
              </span>
            </div>
            <Button className="w-full">创建账户</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}`,
  // 为其他组件添加占位符代码
  branding: `// Branding 组件代码
// 此组件正在开发中...`,
  introduce: `// Introduce 组件代码
// 此组件正在开发中...`,
  benefit: `// Benefit 组件代码
// 此组件正在开发中...`,
  usage: `// Usage 组件代码
// 此组件正在开发中...`,
  showcase: `// Showcase 组件代码
// 此组件正在开发中...`,
  testimonial: `// Testimonial 组件代码
// 此组件正在开发中...`,
  faq: `// FAQ 组件代码
// 此组件正在开发中...`,
};

export function ResizablePreview({
  title,
  componentId,
}: ResizablePreviewProps) {
  const [currentWidth, setCurrentWidth] = useState("100%");
  const [copied, setCopied] = useState(false);
  const [selectedSize, setSelectedSize] = useState(presetSizes[0]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        componentCodes[componentId as keyof typeof componentCodes] || ""
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handlePreviewInNewWindow = () => {
    window.open(`/component/preview/${componentId}`, "_blank");
  };

  const handleSizeChange = (size: (typeof presetSizes)[0]) => {
    setSelectedSize(size);
    setCurrentWidth(size.width);
  };

  useEffect(() => {
    const handleResize = () => {
      if (selectedSize.name === "Desktop" && currentWidth === "100%") {
        setCurrentWidth("100%");
      } else {
        const windowWidth = window.innerWidth;
        const currentNumericWidth = parseFloat(currentWidth);
        if (currentWidth.endsWith("%") || isNaN(currentNumericWidth)) {
          return;
        }
        if (currentNumericWidth > windowWidth - 32) {
          setCurrentWidth(`${windowWidth - 32}px`);
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentWidth, selectedSize.name]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "resize") {
        setCurrentWidth(event.data.width);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    setCurrentWidth("100%");
  }, [componentId]);

  const IframePreviewPanel = (
    <div className="relative w-full h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
      <iframe
        src={`/component/preview/${componentId}`}
        height="800px"
        className="relative z-20 w-full bg-background md:block"
        allowFullScreen
      />
    </div>
  );

  return (
    <div className="w-full">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-medium">{title}</h3>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 w-8 p-0"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePreviewInNewWindow}
              className="h-8 w-8 p-0"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {presetSizes.map((size) => (
                  <Button
                    key={size.name}
                    variant={
                      selectedSize.name === size.name ? "default" : "ghost"
                    }
                    size="sm"
                    onClick={() => handleSizeChange(size)}
                    className="h-8 px-2"
                  >
                    <size.icon className="h-4 w-4" />
                  </Button>
                ))}
              </div>
              <div className="text-sm text-gray-500">{currentWidth}</div>
            </div>
            <div
              className="bg-white dark:bg-gray-900 p-4"
              style={{
                width: currentWidth,
                height: selectedSize.height,
                maxWidth: "100%",
                boxSizing: "border-box",
              }}
            >
              <ResizableLayout
                mainPanelContent={IframePreviewPanel}
                initialMainPanelSize={98}
                showResizeHandle={true}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
