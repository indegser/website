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
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.5002 3.66634C9.41449 3.66634 8.37123 4.10402 7.60046 4.88638C6.82935 5.66909 6.3944 6.73275 6.3944 7.84389V11.9935L5.72626 13.3856H15.2741L14.606 11.9935V7.84389C14.606 6.73275 14.171 5.66909 13.3999 4.88638C12.6291 4.10402 11.5859 3.66634 10.5002 3.66634ZM6.65064 3.95064C7.66988 2.91607 9.05439 2.33301 10.5002 2.33301C11.946 2.33301 13.3305 2.91607 14.3497 3.95064C15.3686 4.98487 15.9393 6.38549 15.9393 7.84389V11.6901L17.3929 14.719H3.60742L5.06106 11.6901V7.84389C5.06106 6.38549 5.63173 4.98487 6.65064 3.95064ZM10.5002 18.6663C8.71874 18.6663 7.11128 17.3918 7.11128 15.6313H8.44462C8.44462 16.4871 9.27472 17.333 10.5002 17.333C11.7256 17.333 12.5557 16.4871 12.5557 15.6313H13.8891C13.8891 17.3918 12.2816 18.6663 10.5002 18.6663Z"
              fill="white"
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
