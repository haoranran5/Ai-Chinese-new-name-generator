import { HeroSection } from "@/components/blocks/hero-section";
import { BrandingSection } from "@/components/blocks/branding-section";
import { Navbar } from "@/components/blocks/navbar";
import { Introduce } from "@/components/blocks/introduce";
import { Usage } from "@/components/blocks/usage";
import { Benefit } from "@/components/blocks/benefit";
import { FeaturesSection } from "@/components/blocks/features-section";
import { Showcase } from "@/components/blocks/showcase";
import { Stats } from "@/components/blocks/stats";
import { Pricing } from "@/components/blocks/pricing";
import { TestimonialGrid } from "@/components/blocks/testimonial";
import { Footer } from "@/components/blocks/footer";
import { FAQSection } from "@/components/blocks/faq-section";
import { CTASection } from "@/components/blocks/cta-section";

type Props = {
  params: Promise<{
    block: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { block } = await params; // 使用 await

  const testimonials = [
    {
      id: "1",
      name: "ChaliceAI",
      title: "@nan_chen2547",
      content:
        "刚刚用RavenSaas不到一小时做了个个人博客，从设计到支付集成，一切都很流畅简单。非常适合想要快速搭建专业网站的人！",
      avatarSrc: "/imgs/head/1.jpg",
      image: "/imgs/example.png",
    },
    {
      id: "2",
      name: "Eric Wang",
      title: "@ericwang42",
      content: "如果你想学习使用小红书开发者制作工具网站，RavenSaas非常快捷",
      avatarSrc: "/imgs/head/1.jpg",
      image: "/imgs/example.png",
    },
    {
      id: "3",
      name: "RavenSaas",
      title: "@RavenSaasai",
      content: "一个AI视频生成器的用例，效果非常漂亮。",
      avatarSrc: "/imgs/head/1.jpg",
      image: "/imgs/example.png",
    },
  ];

  const renderBlock = () => {
    switch (block) {
      case "header":
        return <Navbar />;
      case "hero":
        return <HeroSection />;
      case "branding":
        return <BrandingSection />;
      case "introduce":
        return <Introduce />;
      case "usage":
        return <Usage />;
      case "benefit":
        return <Benefit />;
      case "feature":
        return <FeaturesSection />;
      case "showcase":
        return <Showcase />;
      case "stats":
        return <Stats />;
      case "pricing":
        return <Pricing />;
      case "testimonial":
        return (
          <TestimonialGrid
            title="用户对RavenSaas的评价"
            subtitle="听听开发者和创始人如何使用RavenSaas启动他们的AI创业项目。"
            testimonials={testimonials}
          />
        );
      case "cta":
        return <CTASection />;
      case "faq":
        return <FAQSection />;
      case "footer":
        return <Footer />;
      default:
        return <div>404 Not Found</div>;
    }
  };

  return <div>{renderBlock()}</div>;
}
