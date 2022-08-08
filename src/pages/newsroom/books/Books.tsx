import { styled } from "@stitches/react";
import Image from "next/image";
import Link from "next/link";

import { RichText } from "@src/design/notion/RichText";
import { theme } from "@src/design/theme/stitches.config";
import { BookDatabaseType } from "@src/types/book.types";
import { getNotionFileUrl, getNotionTitle } from "@src/utils/notion";

interface Props {
  books: BookDatabaseType;
}

export const Books = ({ books }: Props) => {
  return (
    <Container>
      {books.results.slice(0, 4).map((book) => {
        return (
          <Link key={book.id} href={`/books/${book.id}`}>
            <BookPreview>
              <BookCover>
                <Image
                  src={getNotionFileUrl(book.properties.Cover)}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="top"
                  alt={getNotionTitle(book.properties.Name)}
                />
              </BookCover>
              <div>
                <BookTitle>
                  <RichText data={book.properties.Name.title} />
                </BookTitle>
              </div>
            </BookPreview>
          </Link>
        );
      })}
    </Container>
  );
};

const Container = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridGap: "0 20px",
  padding: "20px 0",
});

const BookPreview = styled("div", {});

const BookCover = styled("div", {
  width: 240,
  height: 320,
  position: "relative",
  borderRadius: 4,
  overflow: "hidden",
  marginBottom: 12,
});

const BookTitle = styled("div", {
  fontWeight: 400,
  fontSize: 13,
  lineHeight: 1.28,
  paddingBottom: 0,
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  color: theme.colors.gray12,
});
