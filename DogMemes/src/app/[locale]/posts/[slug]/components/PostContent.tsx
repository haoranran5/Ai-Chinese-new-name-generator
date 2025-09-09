"use client";

import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarIcon, ClockIcon, BookOpenIcon } from "lucide-react";
import { Posts } from "@/types/db/posts";

interface PostContentProps {
  post: Posts;
}

export function PostContent({ post }: PostContentProps) {
  return (
    <Card className="mt-8">
      <CardHeader className="space-y-6">
        {/* 文章标题 */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
        </div>

        {/* 文章元信息 */}
        <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={post.author_avatar_url || "/imgs/head/default.png"}
                alt={post.author_name}
              />
              <AvatarFallback>
                {post.author_name?.charAt(0) || ""}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium text-foreground">
              {post.author_name}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CalendarIcon className="h-4 w-4 " />
            <span className="text-sm">
              {format(new Date(post.created_at), "yyyy-MM-dd HH:mm:ss", {
                locale: zhCN,
              })}
            </span>
          </div>
        </div>
        <Separator />
      </CardHeader>

      {/* 文章内容 */}
      <CardContent className="pt-6">
        <ScrollArea className="h-full">
          <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:scroll-m-20 prose-headings:font-heading prose-p:leading-7 prose-p:text-muted-foreground prose-a:text-primary prose-a:underline-offset-4 hover:prose-a:underline">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="flex flex-col items-start space-y-4 pt-6">
        <Separator />
        <div className="flex items-center gap-2">
          <BookOpenIcon className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-medium">Related reading</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <Card className="transition-colors hover:bg-muted/50">
            <CardContent className="p-4">
              <h4 className="font-medium truncate">Recommended Article Title</h4>
              <p className="text-sm text-muted-foreground mt-1">
                View more similar content
              </p>
            </CardContent>
          </Card>
          <Card className="transition-colors hover:bg-muted/50">
            <CardContent className="p-4">
              <h4 className="font-medium truncate">Recommended Article Title</h4>
              <p className="text-sm text-muted-foreground mt-1">
                View more similar content
              </p>
            </CardContent>
          </Card>
        </div>
      </CardFooter>
    </Card>
  );
}
