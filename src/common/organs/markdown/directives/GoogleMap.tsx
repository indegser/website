import styled from "@emotion/styled";

export const GoogleMap = ({ src }) => {
  return (
    <Container>
      <Frame
        src={src}
        sandbox="allow-scripts allow-popups allow-top-navigation-by-user-activation allow-forms allow-same-origin"
        allowFullScreen
        loading="lazy"
      />
    </Container>
  );
};

const Container = styled.div`
  aspect-ratio: 16 / 9;
  width: 100%;
  position: relative;
`;

const Frame = styled.iframe`
  border-width: 0px;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  border-radius: 1px;
  pointer-events: auto;
  background-color: rgb(247, 246, 245);
`;
