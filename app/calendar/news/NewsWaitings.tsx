import styled from '@emotion/styled';

export const NewsWaitings = () => {
  return (
    <Container>
      <Headline>
        <Text>기대중인 사람</Text>
      </Headline>
      <Border />
      <div></div>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 20px;
`;

const Headline = styled.div`
  height: var(--scale-dimension-dimension-600, 48px);
  padding: 10px 0;
`;

const Border = styled.div`
  height: 1px;
  background: #f4f4f4;
`;

const Text = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 22.4px */
`;
