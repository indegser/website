import styled from '@emotion/styled';

type Props = {
  type?: 'dark' | 'light';
  likeCount: number;
};

export const Waitings = ({ type = 'light', likeCount = 0 }: Props) => {
  return (
    <Container>
      <Text style={{ color: type === 'dark' ? '#000' : '#fff' }}>
        {likeCount}명이 기대하고 있어요.
      </Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;

const Text = styled.div`
  font-size: 12px;
  line-height: 1.4;
`;
