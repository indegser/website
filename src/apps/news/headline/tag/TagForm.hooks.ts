import { supabase } from "@src/apis/supabase";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import { TagType } from "@src/types/news.types";
import { useNewsTag } from "./NewsTag.hooks";

export const useTagForm = () => {
  const form = useForm<{ tag: string }>();
  const { mutate } = useSWRConfig();
  const { updateNewsTag } = useNewsTag();

  const handleSubmit = form.handleSubmit(async ({ tag }) => {
    const result = await supabase
      .from<TagType>("tags")
      .insert({ name: tag }, { returning: "representation" });

    const [created] = result.data;

    mutate(
      "tags",
      (tags: TagType[]) => {
        return [created, ...tags];
      },
      false
    );

    updateNewsTag(created);

    form.reset();
  });

  return { form, handleSubmit };
};
