import { GetStaticProps } from "next";
import { MainPage } from "apps/main/MainPage";
import { firebaseApi } from "apis/firebase";

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const initialData = await firebaseApi.getStories();
    return { props: { initialData }, revalidate: 60 }; // 1min.
  } catch (err) {
    console.warn(err);
    return { props: {} };
  }
};

export default MainPage;
