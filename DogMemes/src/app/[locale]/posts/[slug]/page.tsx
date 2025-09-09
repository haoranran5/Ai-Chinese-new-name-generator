import { CustomBreadcrumb } from "@/components/ui/breadcrumb";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Navbar } from "@/components/blocks/navbar";
import { PostContent } from "./components/PostContent";
import { getPostBySlug } from "@/models/posts";
import { Posts } from "@/types/db/posts";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  // 构建面包屑
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/posts" },
    { label: "Post", href: "" },
  ];

  // 使用 Suspense 包裹异步数据获取
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  // 更新面包屑
  if (post?.title) {
    breadcrumbs[2] = {
      label: post.title as string,
      href: `/posts/${slug}`,
    };
  }

  // 错误处理
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <CustomBreadcrumb items={breadcrumbs} />
        <Alert className="mt-8">
          <AlertTitle className="text-xl font-semibold">
            Failed to load blog post
          </AlertTitle>
          <AlertDescription className="mt-2">
            The requested post does not exist or an error occurred. Please check for duplicate slugs and try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <>
      <Navbar currentPage="blog" />
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <CustomBreadcrumb items={breadcrumbs} />
          <PostContent post={post as unknown as Posts} />
        </div>
      </div>
    </>
  );
}
