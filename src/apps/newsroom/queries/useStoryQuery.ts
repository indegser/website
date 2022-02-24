import { firebaseApi } from "apis/firebase";
import { useRouter } from "next/router";
import useSWR from "swr";

export const useStoryQuery = () => {
  const { storyId } = useRouter().query;
  const { data } = useSWR(storyId, () =>
    firebaseApi.getStory(storyId.toString())
  );

  return { data };
};
