interface Props {
  id: string;
}

export const NotionContent = async ({ id }: Props) => {
  return (
    <article className="text-[17px] font-[420] leading-relaxed text-gray-800 dark:text-gray-100 dark:text-opacity-70"></article>
  );
};
