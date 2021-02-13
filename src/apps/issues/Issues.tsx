import { Suspense } from "react";
import { isServer } from "global.types";
import IssueList from "./IssueList";
import PageContainer from "common/atoms/container/PageContainer";
import AuthorContainer from "common/atoms/container/AuthorContainer";

const Issues = () => {
  return (
    <PageContainer>
      <AuthorContainer>
        {!isServer && (
          <Suspense fallback={null}>
            <IssueList />
          </Suspense>
        )}
      </AuthorContainer>
    </PageContainer>
  );
};

export default Issues;
