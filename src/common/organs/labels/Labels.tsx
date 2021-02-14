import useSWR from "swr";
import { FC } from "react";
import githubApi from "apis/github";
import styled from "@emotion/styled";
import { colors } from "style.types";
import Link from "next/link";

interface Props {
  repo: "story" | "book";
}

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: max-content;
  grid-gap: 20px;

  grid-column-start: span 2;

  & > a {
    &:hover {
      text-decoration: underline;
    }
  }
`;

const LabelText = styled.div`
  font-weight: 600;
  font-size: 14px;
`;

const LabelDesc = styled.div`
  font-weight: 400;
  font-size: 12px;
  color: ${colors.textLightGrey};
`;

const Labels: FC<Props> = ({ repo }) => {
  const { data } = useSWR([repo, "labels"], (repo) =>
    githubApi.getLabels(repo)
  );

  console.log(data);
  return (
    <Container>
      {data?.data.map((label) => (
        <Link key={label.id} href="/" passHref>
          <a>
            <LabelText>{label.name}</LabelText>
            <LabelDesc>{label.description}</LabelDesc>
          </a>
        </Link>
      ))}
    </Container>
  );
};

export default Labels;
