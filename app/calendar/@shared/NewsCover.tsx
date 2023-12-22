import styled from '@emotion/styled';
import { useState } from 'react';
import { SubIcon } from './SubIcon';

interface Props {
  imageUrl: string;
}

export const NewsCover = ({ imageUrl }: Props) => {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <Container>
      <Image src={imageUrl} />
      <div style={{ height: '50%' }}></div>
      <MaskContainer>
        <Mask />
      </MaskContainer>
      <Subscribe
        data-subscribed={subscribed}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setSubscribed(!subscribed);
        }}
      >
        <SubIcon subscribed={subscribed} />
        <SubText>{subscribed ? '알림받음' : '알림'}</SubText>
      </Subscribe>
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
`;

const SubText = styled.div`
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Subscribe = styled.div`
  position: absolute;
  top: 20px;
  right: 12px;
  border-radius: 60px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3.5px);
  display: inline-flex;
  padding: 10px 12px;
  justify-content: center;
  align-items: center;
  gap: 2px;
  color: #fff;

  &[data-subscribed='true'] {
    background: #fff;
    color: black;
  }
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
