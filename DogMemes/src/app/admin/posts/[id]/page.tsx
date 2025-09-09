import { Suspense } from "react";
import { notFound } from "next/navigation";
import EditPostForm from "./EditPostForm";
import { getPostById } from "@/models/posts";
import { Posts } from "@/types/db/posts";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <Suspense fallback={<div>加载中...</div>}>
        <EditPostForm post={post as unknown as Posts} postId={id} />
      </Suspense>
    </div>
  );
}
