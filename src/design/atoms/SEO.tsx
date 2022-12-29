import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

import { GIT_COMMIT_SHA, ORIGIN } from "@src/types/constants";

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
      titleTemplate="%s - Indegser"
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
          content: GIT_COMMIT_SHA,
        },
      ]}
    />
  );
};
