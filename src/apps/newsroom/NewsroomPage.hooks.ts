import { captureMessage, Severity } from "@sentry/nextjs";
import { extraApi } from "apis/extra";
import { firebaseApi } from "apis/firebase";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { Descendant, Node } from "slate";

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
  const idRef = useRef(query.storyId?.toString() ?? null);

  const [handleAutoSave, teardown] = debounce(async (value: Descendant[]) => {
    const content = JSON.stringify(value);
    const titleBlock =
      value.find((node) => {
        if ("type" in node) {
          return node.type === "title";
        }
        return false;
      }) ?? value[0];

    const title = Node.string(titleBlock);
    const id = idRef.current;

    if (!id) {
      const { id: refId } = await firebaseApi.createStory({ title, content });

      replace(`/story/${refId}`, null, { shallow: true });

      idRef.current = refId;
    } else {
      await firebaseApi.updateStory(id, { title, content });

      extraApi
        .revalidateStory(id)
        .then((res) => {
          console.info("💡 Updated static page!");
        })
        .catch((err) => {
          console.warn("😮‍💨 Failed to update static page...");
          captureMessage(
            "😮‍💨 Failed to update static page...",
            Severity.Warning
          );
        });
    }
  }, 1000);

  useEffect(() => {
    teardown();
  }, []);

  return {
    handleAutoSave,
  };
};
