import { useForm } from "react-hook-form";
import firebase from "firebase/app";
import grayMatter from "gray-matter";
import { useBannerStore } from "common/organs/banner/Banner.hooks";

type FormData = {
  slug: string;
  content: string;
};

export const useEditorForm = (story?: IStory) => {
  const { register, handleSubmit } = useForm<FormData>();
  const setBanner = useBannerStore((s) => s.setBanner);

  const submit = (data: FormData) => {
    const { data: matter } = grayMatter(data);
    const iso = new Date().toISOString();
    const prefix = iso.slice(0, 10).replace(/-/g, "/");
    const slug = `${prefix}/${data.slug}`;

    firebase
      .firestore()
      .collection("stories")
      .add({
        slug,
        content: data.content,
        data: matter,
        createdAt: Date.now(),
        modifiedAt: Date.now(),
      })
      .then(() => {
        setBanner({
          type: "success",
          message: `Successfully ${story ? "updated" : "created"} story!`,
        });
      })
      .catch((err) => {
        setBanner({
          type: "failure",
          message: err.message,
        });
      });
  };

  return {
    register,
    handleSubmit: handleSubmit(submit),
  };
};
