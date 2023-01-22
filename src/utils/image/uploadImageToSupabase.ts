import mime from "mime-types";
import { nanoid } from "nanoid";

import { supabase } from "@src/sdks/supabase";

export const uploadImageToSupabase = async (
  imageUrl: string,
  folder: string
) => {
  const response = await fetch(imageUrl);
  const contentType = response.headers.get("Content-Type");
  const extension = mime.extension(contentType);

  if (!extension) {
    return false;
  }

  const id = nanoid();
  const path = `${folder}/${id}.${extension}`;

  await supabase.storage.from("image").upload(path, response.body, {
    contentType,
  });

  const { data, error } = supabase.storage.from("image").getPublicUrl(path);

  if (error) return false;

  return {
    id,
    path,
    extension,
    contentType,
    publicURL: data.publicUrl,
  };
};
