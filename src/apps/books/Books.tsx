import styled from "@emotion/styled";
import Author from "common/atoms/Author";
import AuthorContainer from "common/atoms/container/AuthorContainer";
import PageContainer from "common/atoms/container/PageContainer";
import { COLORS } from "common/theme";
import { useBooks } from "./Books.hooks";

const BookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  grid-gap: 32px 20px;
`;

const BookTitle = styled.h4`
  font-weight: 500;
  margin: 0.75rem 0 0.25rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const BookAuthor = styled.h5`
  font-weight: 400;
  margin: 0;
  color: var(${COLORS.textGrey});
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Book = styled.div`
  flex: 0 0 auto;
  align-self: flex-end;

  img {
    width: 100%;
    height: auto;
  }

  &:hover {
    cursor: pointer;

    h4,
    h5 {
      text-decoration: underline;
    }
  }
`;

const Books = () => {
  const books = useBooks();

  return (
    <PageContainer>
      <AuthorContainer>
        <Author />
        <BookGrid>
          {books?.map((book) => {
            return (
              <a key={book.id} href={book.link}>
                <Book>
                  <img src={book.cover} />
                  <BookTitle>{book.title}</BookTitle>
                  <BookAuthor>{book.author}</BookAuthor>
                </Book>
              </a>
            );
          })}
        </BookGrid>
      </AuthorContainer>
    </PageContainer>
  );
};

export default Books;
