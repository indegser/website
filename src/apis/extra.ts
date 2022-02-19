import { getAuth } from "firebase/auth";

const revalidateStory = (storyId: string) => {
  const { currentUser } = getAuth();
  const secret = currentUser?.email;

  return fetch(`/api/revalidate?storyId=${storyId}&secret=${secret}`);
};

export const extraApi = {
  revalidateStory,
};
