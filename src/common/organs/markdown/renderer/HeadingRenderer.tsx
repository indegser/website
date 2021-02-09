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
    font-weight: 600;
    word-break: keep-all;
    text-align: left;
    max-width: 320px;
    line-height: 1.3;
    margin-top: 48px;
    font-family: var(--font-sans);
  }

  ${mq("md")} {
    h1 {
      font-size: 1.8em;
    }
  }

  & code {
    font-size: inherit;
  }
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
    </Layout>
  );
};

export default HeadingRenderer;
