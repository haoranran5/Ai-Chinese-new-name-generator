"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { updatePost as updatePostModel } from "@/models/posts";

// 表单验证模式
const formSchema = z.object({
  title: z.string().min(2, {
    message: "标题至少需要2个字符",
  }),
  slug: z
    .string()
    .min(2, {
      message: "Slug至少需要2个字符",
    })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug只能包含小写字母、数字和连字符",
    }),
  description: z.string().optional(),
  content: z.string().optional(),
  status: z.enum(["draft", "published"]),
  locale: z.enum(["en", "zh"]),
});

export type PostFormData = z.infer<typeof formSchema>;

export async function updatePost(postId: string, data: PostFormData) {
  const validatedFields = formSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: validatedFields.error.message };
  }

  try {
    const post = await updatePostModel(postId, validatedFields.data);

    if (!post) {
      console.error("更新文章失败");
      return { error: "更新失败，请稍后重试" };
    }

    revalidatePath("/admin/posts");
    return { success: true };
  } catch (error) {
    console.error("更新文章异常:", error);
    return { error: "更新失败，请稍后重试" };
  }
}
