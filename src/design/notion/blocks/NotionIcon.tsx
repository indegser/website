import { BlockType } from '@src/types/notion';

interface Props {
  icon: Extract<BlockType, { type: 'callout' }>['callout']['icon'];
}

export const NotionIcon = ({ icon }: Props) => {
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
