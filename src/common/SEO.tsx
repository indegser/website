import { NextSeo } from "next-seo";
import { FC } from "react";
import { useRouter } from "next/router";

interface Props {
  title: string;
  description?: string;
  image?: string;
  ogType?: string;
}

export const SEO: FC<Props> = ({
  title,
  description,
  image,
  ogType = "website",
}) => {
  const { asPath } = useRouter();
  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        url: `${process.env.VERCEL_URL}${asPath}`,
        title,
        description,
        type: ogType,
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
