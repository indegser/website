'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { PageContent } from '@/components/atoms/container';
import { BlockType } from '@/lib/notion/notion.types';
import { RichText } from 'components/notion/RichText';

interface Props {
  blocks: BlockType[];
}

export const TocBlock = ({ blocks }: Props) => {
  const pathname = usePathname();
  const headings = blocks.filter((block) => block.type.startsWith('heading'));

  const { result: depthList } = headings.reduce(
    (res, block) => {
      switch (block.type) {
        case 'heading_1': {
          res.hasHeading1 = true;
          res.result.push(0);
          break;
        }
        case 'heading_2': {
          res.hasHeading2 = true;
          res.result.push(res.hasHeading1 ? 1 : 0);
          break;
        }
        case 'heading_3': {
          res.result.push(
            [res.hasHeading1, res.hasHeading2].filter(Boolean).length,
          );
          break;
        }
      }
      return res;
    },
    {
      hasHeading1: false,
      hasHeading2: false,
      result: [] as number[],
    },
  );

  return (
    <PageContent>
      {headings.map((block, i) => {
        const depth = depthList[i];
        return (
          <Link
            key={block.id}
            shallow
            href={{
              pathname,
              query: { hash: block.id },
            }}
          >
            <div
              className="flex h-8 items-center pr-2 pt-1"
              style={{ paddingLeft: 24 * depth }}
            >
              <div className="ml-1 border-b text-sm dark:border-b-gray-600">
                {/* @ts-ignore */}
                <RichText data={block[block.type].rich_text} />
              </div>
            </div>
          </Link>
        );
      })}
    </PageContent>
  );
};
