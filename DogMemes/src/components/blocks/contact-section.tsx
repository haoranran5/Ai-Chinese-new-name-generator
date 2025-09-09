"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageSquare, Send, MapPin, Phone, Clock } from "lucide-react";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-900"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1">
            <MessageSquare className="mr-2 h-4 w-4" />
            联系我们
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            加入社区
          </h2>
          <p className="mt-6 text-xl leading-8 text-gray-600 dark:text-gray-300">
            订阅我们的新闻通讯，获取最新消息和更新
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 联系表单 */}
          <Card className="shadow-xl border-0 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Mail className="h-6 w-6 text-blue-600" />
                发送消息
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-300">
                有问题或建议？我们很乐意听到您的声音。
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    姓名
                  </label>
                  <Input placeholder="您的姓名" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    邮箱
                  </label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  主题
                </label>
                <Input placeholder="消息主题" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  消息
                </label>
                <Textarea placeholder="请输入您的消息..." rows={5} />
              </div>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Send className="mr-2 h-4 w-4" />
                发送消息
              </Button>
            </CardContent>
          </Card>

          {/* 联系信息和新闻通讯 */}
          <div className="space-y-8">
            {/* 联系信息 */}
            <Card className="shadow-xl border-0 bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl">联系信息</CardTitle>
                <p className="text-gray-600 dark:text-gray-300">
                  通过以下方式与我们取得联系
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      邮箱
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      hello@raven.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      电话
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      +86 138 0013 8000
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      地址
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      中国 北京市 朝阳区
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      工作时间
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      周一至周五 9:00-18:00
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 新闻通讯订阅 */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
              <CardHeader>
                <CardTitle className="text-2xl">订阅新闻通讯</CardTitle>
                <p className="text-gray-600 dark:text-gray-300">
                  获取最新的产品更新、技巧和独家内容
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="输入您的邮箱地址"
                    className="flex-1"
                  />
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    订阅
                  </Button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  我们尊重您的隐私。您可以随时取消订阅。
                </p>

                {/* 订阅福利 */}
                <div className="mt-6 space-y-3">
                  <h5 className="font-semibold text-gray-900 dark:text-white">
                    订阅福利：
                  </h5>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      每周产品更新和新功能
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      独家开发技巧和最佳实践
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                      早期访问新功能和模板
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      特别折扣和优惠活动
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
