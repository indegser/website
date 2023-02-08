import { CoverType, PropertyType } from '@src/types/notion';

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
