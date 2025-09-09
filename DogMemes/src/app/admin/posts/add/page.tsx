import { Suspense } from "react";
import PostForm from "./PostForm";

export default function AddPostPage() {
  return (
    <div className="container mx-auto py-10">
      <Suspense fallback={<div>加载中...</div>}>
        <PostForm />
      </Suspense>
    </div>
  );
}
