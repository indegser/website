import { Fragment } from "react";

import { Journal } from "./Journal";

import { styled } from "@src/design/theme/stitches.config";
import { JournalPageType } from "@src/types/notion";

interface Props {
  page: Array<JournalPageType>;
  onScrollToEnd: () => void;
}

export const JournalGroup = (props: Props) => {
  const { page, onScrollToEnd } = props;

  // if (!isSuccess)
  //   return (
  //     <Spinner>
  //       <SpinnerCircular
  //         size={28}
  //         color={theme.colors.gray10.toString()}
  //         secondaryColor={theme.colors.gray4.toString()}
  //       />
  //     </Spinner>
  //   );

  return (
    <Fragment>
      {page.map((page) => {
        return <Journal key={page.id} page={page} />;
      })}
      {/* <InView
        as="div"
        style={{ height: 1 }}
        triggerOnce
        onChange={(inView) => inView && onScrollToEnd()}
      /> */}
    </Fragment>
  );
};

const Spinner = styled("div", {
  display: "flex",
  justifyContent: "center",
  padding: "24px 0",
});
