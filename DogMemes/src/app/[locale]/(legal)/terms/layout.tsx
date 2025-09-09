import { generateMetadataFromFolder } from "@/mdx-components";

export const metadata = generateMetadataFromFolder("terms");

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
