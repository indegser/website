import { NextSeo } from "next-seo";
import { FC } from "react";
import { useRouter } from "next/router";

interface Props {
  title: string;
  description?: string;
  image?: string;
}

export const SEO: FC<Props> = ({ title, description, image }) => {
  const { asPath } = useRouter();
  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        url: `${process.env.VERCEL_URL}${asPath}`,
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
