import { PageContainer } from "common/atoms/Container";
import { NewsHeadline } from "./headline/Headline";
import { NewsContent } from "./NewsContent";
import { NewsSeo } from "./NewsSeo";

export const NewsPage = () => {
  return (
    <PageContainer>
      <NewsSeo />
      <NewsHeadline />
      <NewsContent />
    </PageContainer>
  );
};
