import dynamic from "next/dynamic";

const EditorPage = dynamic(
  () => import("apps/editor/EditorPage").then((mod) => mod.EditorPage),
  { ssr: false }
);

export default EditorPage;
