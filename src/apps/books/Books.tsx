import styled from "@emotion/styled";
import { colors } from "style.types";
import Typography from "common/atoms/Typography";
import { useBooks } from "./Books.hooks";
import Reading from "./Reading";
import { LayoutGrid } from "common/atoms/Container";

const BookContent = styled.div`
  height: 80px;
`;

const BookTitle = styled.h4`
  margin: 0.75rem 0 0.25rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const BookAuthor = styled.h5`
  font-weight: 400;
  margin: 0;
  color: ${colors.textMarqueeLabel};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const BookGridItem = styled.div`
  grid-column: span 2;
`;

const Book = styled.div`
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
    <LayoutGrid>
      {books?.map((book) => {
        return (
          <BookGridItem key={book.id}>
            <a href={book.link}>
              <Book>
                <img src={book.cover} />
                <BookContent>
                  <BookTitle>
                    <Typography.MarqueeTitle>
                      {book.title}
                    </Typography.MarqueeTitle>
                  </BookTitle>
                  <BookAuthor>
                    <Typography.MarqueeDesc>
                      {book.author}
                    </Typography.MarqueeDesc>
                  </BookAuthor>
                  {book.isReading && <Reading />}
                </BookContent>
              </Book>
            </a>
          </BookGridItem>
        );
      })}
    </LayoutGrid>
  );
};

export default Books;
