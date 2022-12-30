import { Text } from "@src/design/atoms/typography/Text";
import { useBooksQuery } from "@src/queries/useBooksQuery";
import { PropertyType } from "@src/types/notion";
import { getNotionTitle } from "@src/utils/notion";

interface Props {
  relation: PropertyType<"relation">;
}

export const RelatedBook = (props: Props) => {
  const {
    relation: { relation },
  } = props;
  const { data: books } = useBooksQuery();

  const isNotRelated = relation.length === 0;

  if (isNotRelated) return null;

  /** @todo Skeleton으로 교체 */
  if (!books) return <div>Loading ...</div>;

  const bookPage = books[relation[0].id];

  return <Text type="tag">{getNotionTitle(bookPage.properties.Title)}</Text>;
};
