import { firebaseApi } from "apis/firebase";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { Node } from "slate";

function debounce<A = unknown, R = void>(
  fn: (args: A) => R,
  ms: number
): [(args: A) => Promise<R>, () => void] {
  let timer: NodeJS.Timeout;

  const debouncedFunc = (args: A): Promise<R> =>
    new Promise((resolve) => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        resolve(fn(args));
      }, ms);
    });

  const teardown = () => clearTimeout(timer);

  return [debouncedFunc, teardown];
}

export const useAutoSave = () => {
  const { replace, query } = useRouter();
  const idRef = useRef(query.storyId.toString() ?? null);

  const [handleAutoSave, teardown] = debounce(async (value: any) => {
    const content = JSON.stringify(value);
    const title = Node.string(value[0]);
    const id = idRef.current;

    if (!id) {
      const { id: refId } = await firebaseApi.createStory({ title, content });

      replace(`/story/${refId}`, null, { shallow: true });

      idRef.current = refId;
    } else {
      await firebaseApi.updateStory(id, { title, content });
    }
  }, 1000);

  useEffect(() => {
    teardown();
  }, []);

  return {
    handleAutoSave,
  };
};
