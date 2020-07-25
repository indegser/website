import { NextSeo } from "next-seo";
import { FC } from "react";
import { useRouter } from "next/router";

interface Props {
  title: string;
  description?: string;
  image?: string;
}

const SEO: FC<Props> = ({ title, description, image }) => {
  const { asPath } = useRouter();
  const vercelUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        url: `${vercelUrl}${asPath}`,
        title,
        description,
        images: image ? [{ url: image }] : [],
        site_name: "Indegser",
      }}
      twitter={{
        handle: "@indegser",
        site: "@indegsercom",
        cardType: "summary_large_image",
      }}
    />
  );
};

export default SEO;
