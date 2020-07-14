import styled from "@emotion/styled";
import PageContainer from "common/atoms/container/PageContainer";
import NewsGrid from "common/organs/grid/NewsGrid";
import Marquee from "./Marquee";
import Author from "./Author";
import { mq } from "common/theme";
import { useEffect, useState } from "react";
import firebase from "firebase/app";

const Container = styled.div`
  padding: 24px 0 40px 0;
  position: relative;
  margin-top: 20px;

  ${mq("md")} {
    margin-top: 0;
  }
`;

const NewsContent = styled.div`
  position: relative;
  ${mq("md")} {
    padding-top: 20px;
    border-top: 1px solid var(--border400);
    &:before {
      content: "";
      position: absolute;
      top: 3px;
      width: 100%;
      border-top: 1px solid var(--border400);
    }
  }
`;

const Content = styled.div`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: max-content auto;

  ${mq("md")} {
    grid-gap: 20px;
    grid-template-columns: auto;
  }
`;

const Opinion = () => {
  const [data, setData] = useState<IStory[]>([]);
  useEffect(() => {
    firebase
      .firestore()
      .collection("stories")
      .orderBy("modifiedAt", "desc")
      .get()
      .then((d) => {
        setData(
          d.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          })) as IStory[]
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <PageContainer>
      <Container>
        <Content>
          <Author />
          <NewsContent>
            <NewsGrid>
              {data?.map((story) => (
                <Marquee key={story.id} story={story} />
              ))}
            </NewsGrid>
          </NewsContent>
        </Content>
      </Container>
    </PageContainer>
  );
};

export default Opinion;
