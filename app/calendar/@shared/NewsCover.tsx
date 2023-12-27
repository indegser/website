import styled from '@emotion/styled';

interface Props {
  imageUrl: string;
}

export const NewsCover = ({ imageUrl }: Props) => {
  return (
    <Container>
      <Image src={imageUrl} />
      <div style={{ height: '50%' }}></div>
      <MaskContainer>
        <Mask />
      </MaskContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 8px;
  overflow: hidden;
`;

const MaskContainer = styled.div`
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  position: relative;
`;

const Mask = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 8px;
  overflow: hidden;
  mask-image: linear-gradient(
    to bottom,
    transparent,
    rgba(0, 0, 0, 0.068) 3.3%,
    rgba(0, 0, 0, 0.145) 5.9%,
    rgba(0, 0, 0, 0.227) 8.1%,
    rgba(0, 0, 0, 0.313) 10.1%,
    rgba(0, 0, 0, 0.401) 12.1%,
    rgba(0, 0, 0, 0.49) 14.6%,
    rgba(0, 0, 0, 0.578) 17.7%,
    rgba(0, 0, 0, 0.661) 21.8%,
    rgba(0, 0, 0, 0.74) 27.1%,
    rgba(0, 0, 0, 0.812) 33.9%,
    rgba(0, 0, 0, 0.875) 42.4%,
    rgba(0, 0, 0, 0.927) 53%,
    rgba(0, 0, 0, 0.966) 66%,
    rgba(0, 0, 0, 0.991) 81.5%,
    rgba(0, 0, 0, 0.991) 100%
  );
  backdrop-filter: saturate(190%) blur(60px);
`;
