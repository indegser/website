import Error from "next/error";
import Story from "apps/story/Story";
import { FC } from "react";
import Editor from "apps/editor/Editor";
import { GetServerSideProps } from "next";
import firebase from "firebase/app";

interface Props {
  story: IStory;
  edit: boolean;
}

const Page: FC<Props> = ({ story, edit }) => {
  if (!story) {
    return <Error statusCode={404} />;
  }

  if (edit) {
    return <Editor story={story} />;
  }
  return <Story story={story} />;
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  const slug = Array.isArray(query.slug) ? query.slug.join("/") : query.slug;
  const [_, id] = slug.split("----");

  const { edit = null } = query;

  let story: IStory = null;

  console.time("request");
  try {
    const doc = await firebase.firestore().collection("stories").doc(id).get();
    story = { id: doc.id, ...doc.data() } as IStory;
    res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
  } catch (err) {
    console.log(err.message);
  }

  console.timeEnd("request");

  return { props: { story, edit } };
};

export default Page;
