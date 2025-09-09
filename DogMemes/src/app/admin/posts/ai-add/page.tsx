import { Suspense } from "react";
import AIPostForm from "./AIPostForm";

export default function AIAddPostPage() {
  return (
    <div className="container mx-auto py-10">
      <Suspense fallback={<div>加载中...</div>}>
        <AIPostForm />
      </Suspense>
    </div>
  );
}