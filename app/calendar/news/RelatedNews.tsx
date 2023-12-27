import styled from '@emotion/styled';

export const RelatedNews = () => {
  return (
    <Container>
      <Headline>
        <Text>관련 이벤트</Text>
      </Headline>
      <Border />
    </Container>
  );
};

const Container = styled.div`
  padding: 0 20px;
  padding-top: 20px;
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

  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 22.4px */
`;

const List = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
`;
