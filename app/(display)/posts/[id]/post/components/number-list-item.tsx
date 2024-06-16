import { PortableTextListItemComponent } from 'next-sanity';

const alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

function counterGenerator(type: number, marker: number) {
  switch (type) {
    case 1: {
      return marker + 1;
    }
    case 0: {
      return alphabet[marker % alphabet.length];
    }
    default: {
      return;
    }
  }
}

export const NumberListItem: PortableTextListItemComponent = ({
  children,
  index,
  value,
}) => {
  const { level = 0 } = value;

  return (
    <div className="flex w-full items-start pl-0.5">
      <div className="mr-0.5 flex h-6 w-6 items-center justify-center text-lg leading-6">
        {counterGenerator(level % 2, index)}.
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
};
