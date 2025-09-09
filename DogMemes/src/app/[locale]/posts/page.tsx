import Link from "next/link";
import { CalendarIcon } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Navbar } from "@/components/blocks/navbar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getPostsByLocale, getPostsLocaleTotal } from "@/models/posts";
import { getTranslations } from "next-intl/server";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
 
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();
 
  let canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/posts`;
 
  if (locale !== "en") {
    canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/${locale}/posts`;
  }
 
  return {
    title: t("blog.title"),
    description: t("blog.description"),
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function PostsPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ page?: string }>;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { page: pageParam } = await searchParams;
  const page = parseInt(pageParam || '1');
  const limit = 10;
  const posts = await getPostsByLocale(locale, page, limit);

  // 获取总文章数用于分页
  const totalPosts = await getPostsLocaleTotal(locale);
  const totalPages = Math.ceil(totalPosts / limit);

  return (
    <>
      <Navbar currentPage="blog" />
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-16 md:py-24">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground">
              News, resources, and updates about RavenSaaS
            </p>
          </div>

          {/* Posts Grid */}
          <div className="max-w-7xl mx-auto">
            {!posts || posts.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No posts yet</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <Link
                    key={post.uuid}
                    href={`/posts/${post.slug}`}
                    className="block group"
                  >
                    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                      {post.cover_url ? (
                        <div className="aspect-[16/9] w-full overflow-hidden">
                          <img
                            src={post.cover_url}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[16/9] w-full bg-muted flex items-center justify-center">
                          <span className="text-muted-foreground">
                            No image
                          </span>
                        </div>
                      )}
                      <CardHeader className="pb-2">
                        <h2 className="text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors duration-200">
                          {post.title}
                        </h2>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-muted-foreground text-sm line-clamp-3">
                          {post.description || "No description"}
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center pt-0">
                        <div className="flex items-center gap-2">
                          {post.author_avatar_url ? (
                            <img
                              src={post.author_avatar_url || "/imgs/head/default.png"}
                              alt={post.author_name || "Admin"}
                              className="w-8 h-8 rounded-full"
                            />
                          ) : (
                            <span className="text-sm font-medium text-foreground">
                              {post.author_name || "Anonymous"}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <CalendarIcon className="h-3 w-3" />
                          <span>{formatDate(post.created_at)}</span>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            )}

            {/* 分页组件 */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    {/* 上一页 */}
                    {page > 1 && (
                      <PaginationItem>
                        <PaginationPrevious
                          href={`/posts?page=${page - 1}`}
                        />
                      </PaginationItem>
                    )}

                    {/* 页码 */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                      // 显示逻辑：当前页前后各2页
                      if (
                        pageNum === 1 ||
                        pageNum === totalPages ||
                        (pageNum >= page - 2 && pageNum <= page + 2)
                      ) {
                        return (
                          <PaginationItem key={pageNum}>
                            <PaginationLink
                              href={`/posts?page=${pageNum}`}
                              isActive={pageNum === page}
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      } else if (
                        pageNum === page - 3 ||
                        pageNum === page + 3
                      ) {
                        return (
                          <PaginationItem key={pageNum}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      return null;
                    })}

                    {/* 下一页 */}
                    {page < totalPages && (
                      <PaginationItem>
                        <PaginationNext
                          href={`/posts?page=${page + 1}`}
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
