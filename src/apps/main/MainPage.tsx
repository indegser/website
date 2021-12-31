import { PageContainer } from "common/atoms/Container";
import { DataRow } from "./DataRow";
import { SEO } from "common/SEO";
import { StoryType } from "types/story.types";
import useSWRInfinite from "swr/infinite";
import { firebaseApi } from "apis/firebase";
import { DataLoader } from "./DataLoader";

interface Props {
  initialData: StoryType[];
}

const PAGE_SIZE = 20;

export const MainPage = ({ initialData }: Props) => {
  const { data, size, setSize, isValidating } = useSWRInfinite(
    (_, data) => {
      if (data && data.length === 2) {
        return data[data.length - 1].createdAt;
      }

      if (data && data.length < 2) {
        return null;
      }

      return [""];
    },
    (cursor: string) => {
      return firebaseApi.getStories(cursor, PAGE_SIZE);
    },
    {
      fallbackData: [initialData],
    }
  );

  const contents = data
    .flatMap((stories) => stories)
    .map((story) => <DataRow key={story.id} story={story} />);

  const isReachedEnd = data[data.length - 1].length < PAGE_SIZE;

  const handleLoadMore = () => {
    setSize(size + 1);
  };

  return (
    <PageContainer>
      <SEO title="Pages - Indegser" />
      {contents}
      <DataLoader
        isValidating={isValidating}
        pageSize={PAGE_SIZE}
        canRender={!isReachedEnd}
        onLoadMore={handleLoadMore}
      />
    </PageContainer>
  );
};
