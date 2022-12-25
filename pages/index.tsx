import { GetStaticProps } from "next";

import { Newsroom } from "@src/pages/newsroom/Newsroom";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    // revalidate: 60,
  };
};

export default Newsroom;
