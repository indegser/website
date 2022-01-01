import { PageContainer } from "common/atoms/Container";
import { DataRow } from "./DataRow";
import { SEO } from "common/SEO";
import { StoryType } from "types/story.types";
import useSWRInfinite from "swr/infinite";
import { firebaseApi } from "apis/firebase";
import { DataLoader } from "./DataLoader";
import { CreateNew } from "./CreateNew";
import { useIsAdmin } from "common/hooks/admin.hooks";
import { STORY_DEFAULT_PAGE_SIZE } from "types/const.types";

interface Props {
  initialData: StoryType[];
}

export const MainPage = ({ initialData }: Props) => {
  const isAdmin = useIsAdmin();
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
      return firebaseApi.getStories(cursor);
    },
    {
      fallbackData: [initialData],
    }
  );

  const contents = data
    .flatMap((stories) => stories)
    .map((story) => <DataRow key={story.id} story={story} />);

  const isReachedEnd = data[data.length - 1].length < STORY_DEFAULT_PAGE_SIZE;

  const handleLoadMore = () => {
    setSize(size + 1);
  };

  return (
    <PageContainer>
      <SEO title="Pages - Indegser" />
      {contents}
      <DataLoader
        isValidating={isValidating}
        pageSize={STORY_DEFAULT_PAGE_SIZE}
        canRender={!isReachedEnd}
        onLoadMore={handleLoadMore}
      />
      {isAdmin && <CreateNew />}
    </PageContainer>
  );
};
