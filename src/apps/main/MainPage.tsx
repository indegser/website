import { PageContainer } from "common/atoms/Container";
import { StoryRow } from "./StoryRow";
import { SEO } from "common/SEO";
import { StoryType } from "types/story.types";
import useSWRInfinite from "swr/infinite";
import { firebaseApi } from "apis/firebase";
import { DataLoader } from "./DataLoader";
import { CreateNew } from "./CreateNew";
import { useIsAdmin } from "common/hooks/admin.hooks";
import { STORY_DEFAULT_PAGE_SIZE } from "types/const.types";
import { styled } from "common/stitches.config";
import { mq } from "common/theme";

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
    .map((story) => <StoryRow key={story.id} story={story} />);

  const isReachedEnd = data[data.length - 1].length < STORY_DEFAULT_PAGE_SIZE;

  const handleLoadMore = () => {
    setSize(size + 1);
  };

  return (
    <PageContainer>
      <SEO title="Pages - Indegser" />
      <ContentList>{contents}</ContentList>
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

const ContentList = styled("section", {
  marginTop: 40,

  [mq("sm")]: {
    marginTop: 20,
  },
});
