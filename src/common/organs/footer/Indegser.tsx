import React, { useMemo } from "react";
import Icon from "common/atoms/icons/Icon";
import styled from "@emotion/styled";

const Box = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
`;

const Item = styled.div`
  padding-right: 12px;
  margin-right: 12px;
  color: var(--text200);
  font-size: 14px;
  border-right: 1px solid var(--text100);

  &:last-child {
    margin: 0;
    padding: 0;
    border: none;
  }
`;

const Copyright = styled.div`
  font-size: 15px;
  color: var(--text200);
  padding-right: 16px;
  letter-spacing: 0.1px;
`;

const SnsBox = styled.div`
  align-self: center;
  color: var(--text200);

  &:hover {
    color: var(--text300);
  }

  a {
    color: inherit;
  }
`;

const snsList = [
  {
    name: "github",
    link: "https://github.com/indegser",
    variant: "github",
  },
];

const Indegser = () => {
  const year = useMemo(() => {
    return new Date().getFullYear();
  }, []);
  return (
    <Box>
      <Copyright>{year}, Jaekwon Han.</Copyright>
      {snsList.map((sns) => {
        return (
          <Item key={sns.name}>
            <a
              key={sns.name}
              title={sns.name}
              href={sns.link}
              target="_blank"
              rel="noreferrer noopener"
            >
              <SnsBox>
                <Icon variant={sns.variant as any} width={16} height={16} />
              </SnsBox>
            </a>
          </Item>
        );
      })}
      <Item>indegser@gmail.com</Item>
    </Box>
  );
};

export default Indegser;
