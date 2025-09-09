import { generateMetadataFromFolder } from "@/mdx-components";

export const metadata = generateMetadataFromFolder("privacy");

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
