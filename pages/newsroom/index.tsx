import dynamic from "next/dynamic";

const EditorPage = dynamic(
  () => import("apps/newsroom/NewsroomPage").then((mod) => mod.NewsroomPage),
  { ssr: false }
);

export default EditorPage;
