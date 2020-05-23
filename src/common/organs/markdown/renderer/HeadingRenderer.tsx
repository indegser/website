import { createElement, useEffect, useRef, useState } from "react";
import GithubSlugger from "github-slugger";
import styled from "@emotion/styled";

const Layout = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5 {
    font-weight: 500;
    letter-spacing: -0.02em;
    word-break: break-word;
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
