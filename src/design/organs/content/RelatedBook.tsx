import { Text } from "@src/design/atoms/typography/Text";
import { JournalPageType } from "@src/types/notion";
import { notionUtils } from "@src/utils/notion";

interface Props {
  properties: JournalPageType["properties"];
}

export const RelatedBook = (props: Props) => {
  const { properties } = props;
  const text = notionUtils.toString(properties.Quote);

  if (text.length === 0) return null;

  return <Text type="tag">{text}</Text>;
};
