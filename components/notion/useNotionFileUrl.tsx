import { CoverType, PropertyType } from 'lib/supabase/notion.types';

interface Props {
  file: PropertyType<'files'>['files'][number] | CoverType;
}

export const useNotionFileUrl = () => {
  return {
    getUrl: ({ file }: Props) => {
      const url = file.type === 'file' ? file.file.url : file.external.url;

      return url;
    },
  };
};
