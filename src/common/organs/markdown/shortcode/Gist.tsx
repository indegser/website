import { useRef, useEffect, useState } from "react";
import ParagraphRenderer from "../renderer/ParagraphRenderer";

interface Props {
  src: string;
}

const Gist: React.FC<Props> = ({ src, ...e }) => {
  const ref = useRef<HTMLIFrameElement>();
  const bodyHeightRef = useRef<number>();
  const [height, setHeight] = useState(0);

  const getDoc = () => {
    const iframe = ref.current;
    return iframe?.contentDocument || iframe?.contentWindow.document;
  };

  const getBody = () => {
    return getDoc()?.querySelector("body");
  };

  const detector = () => {
    const height = getBody()?.scrollHeight;
    if (bodyHeightRef.current !== height) {
      setHeight(height);
      return;
    }

    requestAnimationFrame(detector);
  };

  useEffect(() => {
    const iframe = ref.current;
    if (!iframe || !src) return;

    const doc = getDoc();
    const body = getBody();

    doc.open();
    doc.writeln(`
      <html>
        <head>
          <base target="_parent" />
          <style>
            body { margin: 0 }
          </style>
        </head>
        <body>
          <script type="text/javascript" src=${src}></script>
        </body>
      </html>
    `);
    doc.close();

    bodyHeightRef.current = body.scrollHeight;
    detector();
  }, []);

  return (
    <ParagraphRenderer>
      <iframe ref={ref} width="100%" height={height} frameBorder="0"></iframe>
    </ParagraphRenderer>
  );
};

export default Gist;
