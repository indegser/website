import { firebaseApi } from "apis/firebase";
import { NewsroomPage } from "apps/newsroom/NewsroomPage";
import { GetServerSideProps } from "next";

export default NewsroomPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params;

  try {
    const { content } = await firebaseApi.getStory(id.toString());
    return {
      props: {
        content: JSON.parse(content),
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};
