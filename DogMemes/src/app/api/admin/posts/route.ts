import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { authOptions } from "@/lib/auth";
import { insertPost } from "@/models/posts";

// 移除 edge runtime，使用默认的 Node.js runtime 以支持 NextAuth.js

// 表单验证模式
const postSchema = z.object({
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

export async function POST(req: Request) {
  try {
    // 检查用户认证
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "未授权访问" },
        { status: 401 }
      );
    }

    // 检查管理员权限
    const adminEmails = process.env.ADMIN_EMAILS?.split(",");
    if (!adminEmails?.includes(session.user.email)) {
      return NextResponse.json(
        { error: "无管理员权限" },
        { status: 403 }
      );
    }

    // 解析请求体
    const body = await req.json();
    
    // 验证数据
    const validatedFields = postSchema.safeParse(body);
    if (!validatedFields.success) {
      return NextResponse.json(
        { error: "数据验证失败", details: validatedFields.error.errors },
        { status: 400 }
      );
    }

    // 创建文章
    const post = await insertPost({
      uuid: uuidv4(),
      title: validatedFields.data.title,
      slug: validatedFields.data.slug,
      description: validatedFields.data.description || "",
      content: validatedFields.data.content || "",
      status: validatedFields.data.status,
      locale: validatedFields.data.locale,
      author_name: session.user.name || "",
      author_avatar_url: session.user.image || "",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (!post) {
      return NextResponse.json(
        { error: "创建文章失败" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      post: {
        id: post.id,
        uuid: post.uuid,
        title: post.title,
        slug: post.slug,
        status: post.status,
      },
    });

  } catch (error) {
    console.error("创建文章API错误:", error);
    return NextResponse.json(
      { error: "服务器内部错误" },
      { status: 500 }
    );
  }
}
