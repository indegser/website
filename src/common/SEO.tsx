import { NextSeo } from "next-seo";
import { FC } from "react";
import { useRouter } from "next/router";
import { environment } from "types/env.types";
import { PRODUCTION_URL } from "types/const.types";

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
  const isProduction = environment === "production";

  console.log(process.env.VERCEL_URL, "VERCEL_URL");
  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        url: `${
          isProduction ? PRODUCTION_URL : process.env.VERCEL_URL
        }${asPath}`,
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
