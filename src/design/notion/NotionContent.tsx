import { Block } from './blocks/Block';

import { pageApi } from '@src/apis/content';

interface Props {
  id: string;
}

export const preload = (id: string) => {
  void pageApi.getContent(id);
};

export const NotionContent = async ({ id }: Props) => {
  const { results } = await pageApi.getContent(id);

  return (
    <article className="text-lg">
      {results.map((block, index) => {
        return (
          <Block key={block.id} block={block} index={index} blocks={results} />
        );
      })}
    </article>
  );
};
