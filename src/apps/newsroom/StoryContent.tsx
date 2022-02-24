import { useIsAdmin } from "common/hooks/admin.hooks";
import { NewsroomPage } from "./NewsroomPage";
import { useStoryQuery } from "./queries/useStoryQuery";

export const StoryContent = () => {
  const { data } = useStoryQuery();
  const isAdmin = useIsAdmin();
  const initialValue = JSON.parse(data.content);
  return <NewsroomPage isReadOnly={!isAdmin} content={initialValue} />;
};
