import styled from '@emotion/styled';

type Props = {
  type?: 'dark' | 'light';
  likeCount: string;
};

export const Waitings = ({ type = 'light', likeCount = '1' }: Props) => {
  return (
    <Container>
      <Text style={{ color: type === 'dark' ? '#000' : '#fff' }}>
        {parseInt(likeCount).toLocaleString()}명이 기대하고 있어요.
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
