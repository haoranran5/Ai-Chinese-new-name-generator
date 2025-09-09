import { Suspense } from "react";
import InviteClient from "./InviteClient";

type Props = {
  params: Promise<{
    code: string;
  }>;
};

export default async function InvitePage({ params }: Props) {
  const { code } = await params;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Suspense
        fallback={
          <div className="text-center">
            <div className="h-8 w-8 animate-spin mx-auto mb-4" />
            <h2 className="text-2xl font-semibold">Loading...</h2>
          </div>
        }
      >
        <InviteClient inviteCode={code} />
      </Suspense>
    </div>
  );
}
