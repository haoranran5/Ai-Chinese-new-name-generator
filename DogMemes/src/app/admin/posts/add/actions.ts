"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { insertPost } from "@/models/posts";

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

export async function createPost(data: PostFormData) {
  const validatedFields = formSchema.safeParse(data);
  const session = await getServerSession(authOptions);

  if (!validatedFields.success) {
    return { error: validatedFields.error.message };
  }

  try {
    const post = await insertPost({
      uuid: uuidv4(),
      title: validatedFields.data.title,
      slug: validatedFields.data.slug,
      description: validatedFields.data.description || "",
      content: validatedFields.data.content || "",
      status: validatedFields.data.status,
      locale: validatedFields.data.locale,
      author_name: session?.user?.name || "",
      author_avatar_url: session?.user?.image || "",
      created_at: new Date().toISOString(), 
    });

    if (!post) {
      console.error("创建文章失败");
      return { error: "创建失败，请稍后重试" };
    }

    revalidatePath("/admin/posts");
    return { success: true };
  } catch (error) {
    console.error("创建文章异常:", error);
    return { error: "创建失败，请稍后重试" };
  }
}
