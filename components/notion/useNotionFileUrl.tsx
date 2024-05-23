import { CoverType, PropertyType } from '@/lib/notion/notion.types';

interface Props {
  file: PropertyType<'files'>['files'][number] | CoverType;
}

export const useNotionFileUrl = () => {
  return {
    getUrl: ({ file }: Props) => {
      if (!file) return null;

      switch (file.type) {
        case 'file':
          return file.file.url;
        case 'external':
          return file.external.url;
      }
    },
  };
};
