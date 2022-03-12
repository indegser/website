import imageExtensions from "image-extensions";
import isUrl from "is-url";
import { nanoid } from "nanoid";
import { Transforms } from "slate";
import { ReactEditor } from "slate-react";

import { supabase } from "@src/apis/supabase";
import { CustomImage } from "@src/types/editor.types";

const isImageUrl = (url: string) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  return imageExtensions.includes(ext);
};

export const withImage = (editor: ReactEditor) => {
  const { insertData } = editor;

  editor.insertData = async (data) => {
    const { files } = data;

    if (files) {
      for (const file of files) {
        const extension = file.type.split("/").pop();
        const isImage = imageExtensions.includes(extension);

        if (!isImage) continue;

        const imageKey = `${nanoid()}.${extension}`;
        const result = await supabase.storage
          .from("images")
          .upload(imageKey, file);

        // Transforms.insertNodes(editor, {
        //   type: "image",
        //   url: supabase.storage.from("images").getPublicUrl(imageKey).publicURL,
        //   children: [{ text: "" }],
        // });
        // console.log(imageExtensions, imageExtensions.includes(file.type));
      }

      return;
    }
    // if (isImageUrl(text)) {
    //   const imageNode: CustomImage = {

    //   }
    //   Transforms.insertNodes(editor, )
    // }

    insertData(data);
  };

  return editor;
};
