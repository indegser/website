import styled from '@emotion/styled';

export const NewsCover = () => {
  return (
    <Container>
      <img src="https://img.29cm.co.kr/cms/202312/11eea068820e6b7683775b2a0e711839.jpg?width=2000&q=75" />
    </Container>
  );
};

const Container = styled.div`
  aspect-ratio: 375 / 380;
  position: relative;
  width: 100%;

  & img {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    object-fit: cover;
    object-position: center;
  }
`;

const Mark = styled.div``;
