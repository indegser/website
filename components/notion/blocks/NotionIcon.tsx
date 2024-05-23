import { BlockType } from '@/lib/notion/notion.types';

interface Props {
  icon: Extract<BlockType, { type: 'callout' }>['callout']['icon'];
}

export const NotionIcon = ({ icon }: Props) => {
  if (!icon) return null;

  switch (icon.type) {
    case 'emoji':
      return <span>{icon.emoji}</span>;
    case 'external':
      return <img src={icon.external.url} />;
    case 'file':
      return <img src={icon.file.url} />;
    default:
      return null;
  }
};
