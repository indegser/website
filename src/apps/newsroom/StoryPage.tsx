import { SWRConfig } from "swr";
import { StoryType } from "types/story.types";
import { StoryContent } from "./StoryContent";
import { StorySeo } from "./StorySeo";

interface Props {
  fallback: { string: StoryType };
}

export const StoryPage = ({ fallback }: Props) => {
  return (
    <SWRConfig value={{ fallback }}>
      <StorySeo />
      <StoryContent />
    </SWRConfig>
  );
};
