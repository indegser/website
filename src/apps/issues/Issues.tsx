import { Suspense } from "react";
import { isServer } from "global.types";
import IssueList from "./IssueList";
import { LayoutGrid } from "common/atoms/Container";
import Labels from "common/organs/labels/Labels";

const Issues = () => {
  return (
    <LayoutGrid>
      <Labels repo="story" />
      {!isServer && (
        <Suspense fallback={null}>
          <IssueList />
        </Suspense>
      )}
    </LayoutGrid>
  );
};

export default Issues;
