import { GetStaticPaths, GetStaticProps } from "next";
import { StoryPage } from "apps/newsroom/StoryPage";
import { firebaseApi } from "apis/firebase";

export const getStaticPaths: GetStaticPaths = async () => {
  const stories = await firebaseApi.getStories("", 50);
  const paths = stories.map((story) => ({
    params: { storyId: story.id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { storyId } = params;

  try {
    const story = await firebaseApi.getStory(storyId.toString());
    return { props: { story } };
  } catch (err) {
    return { notFound: true };
  }
};

export default StoryPage;
