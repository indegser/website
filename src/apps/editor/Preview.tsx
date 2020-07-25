import Markdown from "common/organs/markdown/Markdown";
import gray from "gray-matter";

const Preview = ({ watch }) => {
  const content = watch("content");
  const { content: source } = gray(content);
  return <Markdown source={source} />;
};

export default Preview;
