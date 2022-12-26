import { useBookListQuery } from "./BookFilter.hooks";

import { styled, theme } from "@src/design/theme/stitches.config";

export const BookFilter = () => {
  const { data } = useBookListQuery();
  if (!data) return null;

  return (
    <Container>
      {data.map((book) => {
        return (
          <Book key={book._id}>
            <BookTitle>{book.title}</BookTitle>
            <JournalCount>{book.journalCount}</JournalCount>
          </Book>
        );
      })}
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

const Book = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: 200,
  fontSize: 14,
  fontWeight: 400,
});

const BookTitle = styled("div", {});

const JournalCount = styled("div", {
  fontSize: 12,
  lineHeight: 1,
  borderRadius: "8px",
  padding: `4px 8px`,
  textAlign: "center",
  background: theme.colors.gray3,
});
