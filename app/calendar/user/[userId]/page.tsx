'use client';

import styled from '@emotion/styled';
import { Launchings } from '../../Launchings';

export default function UserPage({
  searchParams,
  params,
}: {
  searchParams: any;
  params: any;
}) {
  const name = params.userId;
  const avatar = searchParams.avatar;

  return (
    <div>
      <Container>
        <Avatar src={avatar} />
        <Headline>{name}</Headline>
      </Container>
      <Launchings title="관심 이벤트" />
    </div>
  );
}

const Container = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid var(--scale-gray-100, #f4f4f4);
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 999rem;
  object-fit: cover;
`;

const Headline = styled.div`
  color: #000;

  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 19.6px */
`;
