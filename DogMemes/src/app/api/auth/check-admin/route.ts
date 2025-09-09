import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userEmail = session?.user?.email?.trim();

    if (!userEmail) {
      return NextResponse.json({ isAdmin: false });
    }

    const adminEmails =
      process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim()) || [];
    const isAdmin = adminEmails.includes(userEmail);

    return NextResponse.json({ isAdmin });
  } catch (error) {
    console.error("验证管理员权限失败:", error);
    return NextResponse.json({ isAdmin: false });
  }
}
