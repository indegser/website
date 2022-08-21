import { NewsType } from "@src/types/news.types";
import { PropertyType } from "@src/types/notion.types";

interface Props {
  file:
    | Extract<PropertyType, { type: "files" }>["files"][number]
    | NewsType["cover"];
}

export const useNotionFileUrl = () => {
  return {
    getUrl: ({ file }: Props) => {
      const url = file.type === "file" ? file.file.url : file.external.url;

      return url;
    },
  };
};
