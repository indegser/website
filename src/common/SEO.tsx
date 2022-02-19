import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { ORIGIN } from "types/const.types";

interface Props {
  title: string;
  description?: string;
  image?: string;
  ogType?: string;
}

export const SEO = ({
  title,
  description,
  image,
  ogType = "website",
}: Props) => {
  const { asPath } = useRouter();

  const url = ORIGIN + asPath;
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={url}
      openGraph={{
        url,
        title,
        description,
        type: ogType,
        images: image ? [{ url: image }] : [],
        site_name: "Indegser",
      }}
      twitter={{
        handle: "@indegser",
        site: ORIGIN,
        cardType: "summary_large_image",
      }}
      additionalMetaTags={[
        {
          property: "git:commit:sha",
          content: process.env.EXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
        },
      ]}
    />
  );
};
