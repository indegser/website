import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';

import { RichText } from '@src/design/notion/RichText';

interface Props {
  caption: RichTextItemResponse[];
}

export const Caption = ({ caption }: Props) => {
  return (
    <div className="mt-4 text-xs font-medium text-gray-500">
      <RichText data={caption} />
    </div>
  );
};
