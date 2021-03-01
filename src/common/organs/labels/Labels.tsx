import useSWR from "swr";
import { FC } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import githubApi from "apis/github";
import { colors } from "style.types";
import { mq } from "common/theme";

interface Props {
  repo: "story" | "book";
}

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: max-content;
  grid-gap: 20px;

  grid-column-start: span 2;

  ${mq("md")} {
    grid-column: span 8;
    grid-auto-flow: column;
  }

  & > a {
    &:hover {
      text-decoration: underline;
    }
  }
`;

const LabelAnchor = styled.a`
  &[aria-current="true"] {
    color: ${colors.linkPrimary};
  }
`;

const LabelText = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: inherit;
`;

const LabelDesc = styled.div`
  font-weight: 400;
  font-size: 12px;
`;

const Labels: FC<Props> = ({ repo }) => {
  const router = useRouter();
  const { data } = useSWR([repo, "labels"], (repo) =>
    githubApi.getLabels(repo)
  );

  const labelInQuery = router.query.label?.toString();

  return (
    <Container>
      <Link href="/" passHref>
        <LabelAnchor aria-current={!labelInQuery}>
          <LabelText>All</LabelText>
        </LabelAnchor>
      </Link>
      {data?.data.map((label) => (
        <Link
          key={label.id}
          href={{
            pathname: router.route,
            query: {
              label: label.name,
            },
          }}
          passHref
        >
          <LabelAnchor aria-current={labelInQuery === label.name.toString()}>
            <LabelText>{label.name}</LabelText>
            <LabelDesc>{label.description}</LabelDesc>
          </LabelAnchor>
        </Link>
      ))}
    </Container>
  );
};

export default Labels;
