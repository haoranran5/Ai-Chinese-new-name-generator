import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { findUserByUuid, updateUserProfileByUuid } from "@/models/user";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await findUserByUuid(session.user.uuid);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("[USER_PROFILE_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const body = await req.json();

    if (!body.nickname) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const updatedUser = await updateUserProfileByUuid(session.user.uuid, body);

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("[USER_PROFILE_PUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
