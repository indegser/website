import styled from '@emotion/styled';

export const NewsSubscribe = ({ id }: { id: string }) => {
  return (
    <a href={`/ics/${id}.ics`}>
      <Floating>
        <Container>
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.08333 7.92855H16.75M6.59127 3V4.28586M15.0833 3V4.28571M15.0833 4.28571H6.75C5.36929 4.28571 4.25 5.43697 4.25 6.85712V15.4286C4.25 16.8487 5.36929 18 6.75 18H15.0833C16.464 18 17.5833 16.8487 17.5833 15.4286L17.5833 6.85712C17.5833 5.43697 16.464 4.28571 15.0833 4.28571ZM8.83333 13.0714L10.0833 14.3571L13 11.3571"
              stroke="white"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <Text>내 캘린더에 등록</Text>
        </Container>
      </Floating>
    </a>
  );
};

const Floating = styled.div`
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translate(-50%, 0);
`;

const Container = styled.div`
  border-radius: 999rem;
  border-radius: 60px;
  background: #000;
  display: inline-flex;
  padding: 12px var(--scale-dimension-dimension-300, 24px);
  justify-content: center;
  align-items: center;
  gap: var(--scale-dimension-dimension-50, 4px);
  backdrop-filter: blur(3.5px);
  color: white;
`;

const Text = styled.div`
  color: #fff;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 22.5px */
`;
