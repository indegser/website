import { PageContainer } from "common/atoms/Container";
import { NewsContent } from "./NewsContent";
import { NewsSeo } from "./NewsSeo";

export const NewsPage = () => {
  return (
    <PageContainer>
      <NewsSeo />
      <NewsContent />
    </PageContainer>
  );
};
