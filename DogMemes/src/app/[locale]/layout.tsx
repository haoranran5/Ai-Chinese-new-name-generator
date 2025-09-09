import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AuthProvider from "@/components/auth/AuthProvider";
import GoogleOneTap from "@/components/auth/googleOneTap";
import { InviteCodeHandler } from "@/components/auth/InviteCodeHandler";
import { Navbar } from "@/components/blocks/navbar";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { PaymentProvider } from "@/components/stripe/payment-context";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`@/i18n/messages/${locale}.json`)).default;
  } catch (error) {
    console.error(error);
    notFound();
  }

  // 获取服务端session
  const session = await getServerSession(authOptions);

  return (
    <AuthProvider session={session}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <PaymentProvider>
          <Navbar hideOnComponentPage={true} />
          {children}
          <GoogleOneTap />
          <InviteCodeHandler />
          {/* <ScrollToTop /> */}
        </PaymentProvider>
      </NextIntlClientProvider>
    </AuthProvider>
  );
}
