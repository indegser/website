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

export async function getStaticPaths() {
  const stories = await firebase.firestore().collection("stories").get();
  const paths = stories.docs.map((doc) => {
    const id = doc.id;
    const { slug } = doc.data();
    const [dates, title] = slug.slice("/");
    return { params: { slug: [...dates, `${title}----${id}`] } };
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const [_, id] = slug[slug.length - 1].split("----");
  const doc = await firebase.firestore().collection("stories").doc(id).get();
  const data = doc.data();

  return {
    props: {
      story: {
        id,
        ...data,
      },
    },
  };
}

export default Page;
