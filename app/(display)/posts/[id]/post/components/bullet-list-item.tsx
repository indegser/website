import { PortableTextListItemComponent } from 'next-sanity';

const bullets = ['▪', '•', '◦'];
export const BulletListItem: PortableTextListItemComponent = ({
  value,
  children,
}) => {
  const { level = 0 } = value;

  return (
    <div className="flex w-full items-start pl-0.5">
      <div className="mr-0.5 flex h-6 w-6 items-center justify-center text-lg leading-6">
        {bullets[level % 3]}
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
};
