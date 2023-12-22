import styled from '@emotion/styled';
import { faker } from '@faker-js/faker';
import { useMemo } from 'react';

type Props = {
  type?: 'dark' | 'light';
};

export const Waitings = ({ type = 'light' }: Props) => {
  const users = ['1', '2', '3'].map((user) => {
    const avatar = faker.internet.avatar();

    return { user, avatar };
  });

  const count = useMemo(() => Math.ceil(Math.random() * 100000), []);

  return (
    <Container>
      <List>
        {users.map(({ user, avatar }) => {
          return (
            <Avatar key={user}>
              <img src={avatar} />
            </Avatar>
          );
        })}
      </List>
      <Text style={{ color: type === 'dark' ? '#000' : '#fff' }}>
        {count.toLocaleString()}명이 기대하고 있어요.
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

const List = styled.div`
  display: flex;
`;

const Text = styled.div`
  font-size: 12px;
  line-height: 1.4;
`;

const Avatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 999rem;
  border: 1px solid #fff;
  margin-left: -10px;
  background: #fff;
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
