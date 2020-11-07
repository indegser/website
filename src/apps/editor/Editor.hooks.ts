import { useForm } from "react-hook-form";
import grayMatter from "gray-matter";
import { useBannerStore } from "common/organs/banner/Banner.hooks";
import backend from "apis/backend";

type FormData = {
  slug: string;
  content: string;
};

export const useEditorForm = (story?: IStory) => {
  const { watch, register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      slug: story?.slug,
      content: story?.content,
    },
  });
  const setBanner = useBannerStore((s) => s.setBanner);

  const submit = async (data: FormData) => {
    const { data: matter } = grayMatter(data.content);

    const collection = backend.firestore().collection("stories");

    try {
      if (story?.id) {
        // Update
        await collection.doc(story.id).update({
          ...data,
          data: matter,
          updatedAt: Date.now(),
        });
      } else {
        // Create
        const iso = new Date().toISOString();
        const prefix = iso.slice(0, 10).replace(/-/g, "/");
        const slug = `${prefix}/${data.slug}`;
        await collection.add({
          slug,
          content: data.content,
          data: matter,
          createdAt: Date.now(),
          modifiedAt: Date.now(),
        });
      }

      setBanner({
        type: "success",
        message: `Successfully ${story ? "updated" : "created"} story!`,
      });
    } catch (err) {
      setBanner({
        type: "failure",
        message: err.message,
      });
    }
  };

  return {
    watch,
    register,
    handleSubmit: handleSubmit(submit),
  };
};
