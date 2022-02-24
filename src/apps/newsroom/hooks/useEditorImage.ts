import { ReactEditor } from "slate-react";
import imageExtensions from "image-extensions";
import isUrl from "is-url";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { CustomImage } from "types/editor.types";
import { Transforms } from "slate";

const isImageUrl = (url: string) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  return imageExtensions.includes(ext);
};

export const useEditorImage = () => {
  const insertImage = (editor: ReactEditor, url: string) => {
    const text = { text: "" };
    const image: CustomImage = {
      type: "image",
      url,
      children: [text],
      caption: { isEnabled: true },
    };
    Transforms.insertNodes(editor, image);
  };

  const withImage = (editor: ReactEditor) => {
    const { insertData, isVoid } = editor;

    editor.isVoid = (element) => {
      return element.type === "image" ? true : isVoid(element);
    };

    editor.insertData = async (data) => {
      const text = data.getData("text/plain");
      const { files } = data;

      if (files && files.length > 0) {
        for (const file of files) {
          const [mime] = file.type.split("/");

          if (mime === "image") {
            const storage = getStorage();
            const uploadRef = ref(storage, Date.now().toString());

            uploadBytes(uploadRef, file).then((snapshot) => {
              getDownloadURL(uploadRef).then((url) => {
                insertImage(editor, url);
              });
            });
          }
        }
      } else if (isImageUrl(text)) {
        insertImage(editor, text);
      } else {
        insertData(data);
      }
    };

    return editor;
  };

  return { withImage, insertImage };
};
