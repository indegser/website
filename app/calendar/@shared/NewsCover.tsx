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
