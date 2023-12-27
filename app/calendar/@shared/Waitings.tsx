import styled from '@emotion/styled';

type Props = {
  type?: 'dark' | 'light';
  itemCount: number;
};

export const Waitings = ({ type = 'light', itemCount = 0 }: Props) => {
  return (
    <Container>
      <Text style={{ color: type === 'dark' ? '#000' : '#fff' }}>
        {itemCount}개의 상품이 기다리고 있어요.
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
