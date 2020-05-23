import { createElement, useEffect, useRef, useState } from "react";
import GithubSlugger from "github-slugger";
import styled from "@emotion/styled";
import { mq } from "common/theme";

const Layout = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5 {
    font-weight: bold;
    word-break: keep-all;
    text-align: left;
    max-width: 320px;
    line-height: 1.3;
    margin-top: 48px;
    font-family: var(--font-serif);
  }

  h1 {
    margin-left: -24px;

    ${mq("md")} {
      margin-left: 0px;
    }
  }
`;

const HeadingDivider = styled.div`
  width: 24px;
  height: 4px;
  background: var(--text400);
  margin-bottom: 24px;
`;

const HeadingRenderer = ({ level, children }) => {
  const [id, setId] = useState(null);
  const ref = useRef<HTMLDivElement>(null);
  const heading = createElement(`h${level}`, { children });

  useEffect(() => {
    const text = ref.current.textContent;
    const slugger = new GithubSlugger();
    const id = slugger.slug(text);
    setId(id);
  }, []);

  return (
    <Layout id={id} ref={ref}>
      {heading}
      {level === 1 && <HeadingDivider />}
    </Layout>
  );
};

export default HeadingRenderer;
