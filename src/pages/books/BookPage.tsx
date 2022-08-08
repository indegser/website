import { PageContainer } from "@src/design/atoms/Container";
import { NotionContent } from "@src/design/notion/NotionContent";
import { BookType } from "@src/types/book.types";
import { BlockType } from "@src/types/notion.types";

interface Props {
  book: BookType;
  blocks: BlockType[];
}

export const BookPage = ({ book, blocks }: Props) => {
  return (
    <PageContainer>
      <NotionContent blocks={blocks} />
    </PageContainer>
  );
};
