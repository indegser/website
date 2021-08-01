import styled from "@emotion/styled";
import { useMemo } from "react";

const Layout = styled.div`
  position: relative;
  padding-bottom: 56%;
  margin: 2em 0;
`;

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
`;

const Youtube = ({ url, alt }) => {
  const src = useMemo(() => {
    const parseId = (id) => {
      const s = id.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
      return undefined !== s[2] ? s[2].split(/[^0-9a-z_\-]/i)[0] : s[0];
    };

    const base = `https://www.youtube.com/embed/${parseId(url)}`;
    const u = new URL(base);
    u.searchParams.append("modestBranding", "1");
    u.searchParams.append("rel", "0");
    return u.href;
  }, [url]);

  return (
    <Layout>
      <Wrapper>
        <Iframe src={src} frameBorder="0" allowFullScreen />
      </Wrapper>
    </Layout>
  );
};

export default Youtube;
