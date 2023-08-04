import { RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints';

import { RichText } from '@src/components/notion/RichText';

interface Props {
  caption: RichTextItemResponse[];
}

export const Caption = ({ caption }: Props) => {
  return (
    <div className="mt-4 px-6 text-sm text-gray-500">
      <RichText data={caption} />
    </div>
  );
};
