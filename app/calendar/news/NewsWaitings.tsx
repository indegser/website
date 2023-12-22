import styled from '@emotion/styled';
import { faker } from '@faker-js/faker';

const users = new Array(10).fill(true).map(() => {
  return {
    id: faker.internet.displayName(),
    avatar: faker.image.avatar(),
  };
});

export const NewsWaitings = () => {
  return (
    <Container>
      <Headline>
        <Text>기대중인 사람</Text>
      </Headline>
      <Border />
      <div>
        {users.map((user) => {
          return (
            <Waiting key={user.id}>
              <Layout>
                <Avatar src={user.avatar} />
                <div style={{ flex: '1 1' }}>
                  <DisplayName>{user.id}</DisplayName>
                  <Stat>관심 이벤트 4</Stat>
                </div>
                <div style={{ flex: '0 0 auto' }}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7.5 5L12.5 10L7.5 15" stroke="#C0C0C0" />
                  </svg>
                </div>
              </Layout>
            </Waiting>
          );
        })}
      </div>
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

const Waiting = styled.div`
  & + & {
    border-top: 1px solid #f4f4f4;
  }
`;

const Layout = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 10px 0;
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 999rem;
`;

const DisplayName = styled.div`
  color: #000;

  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 19.6px */
`;

const Stat = styled.div`
  color: #8c8c8c;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 136%; /* 14.96px */
`;
