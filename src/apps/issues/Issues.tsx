import IssueList from "./IssueList";
import { LayoutGrid } from "common/atoms/Container";
import Labels from "common/organs/labels/Labels";

const Issues = () => {
  return (
    <LayoutGrid>
      <Labels repo="story" />
      <IssueList />
    </LayoutGrid>
  );
};

export default Issues;
