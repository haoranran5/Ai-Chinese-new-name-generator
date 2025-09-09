import { useSession, signOut } from "next-auth/react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const { data: session, status } = useSession();
  const t = useTranslations("Navbar");

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">RavenSaaS</span>
            </Link>
          </div>

          <div className="flex items-center">
            {status === "loading" ? (
              <div className="text-gray-500">加载中...</div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">
                  {session.user?.name || session.user?.email}
                </span>
                <button
                  onClick={() => signOut()}
                  className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded"
                >
                  退出
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              >
                登录
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
