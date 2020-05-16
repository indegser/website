import Opinion from "apps/opinion/Opinion";
import { GetServerSideProps } from "next";
import { parse } from "cookie";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = parse(req.headers.cookie);

  return {
    props: {
      theme: cookies.hello,
    },
  };
};

export default Opinion;
