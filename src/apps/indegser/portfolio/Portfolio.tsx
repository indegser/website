import { useIndegserContext } from "../Indegser.hooks";
import { useState, useEffect } from "react";
import Markdown from "common/organs/markdown/Markdown";

const Portfolio = () => {
  const [sources, setSources] = useState<string[]>([]);
  const { lang } = useIndegserContext();

  useEffect(() => {
    const fileNames = [
      "aurumplanet",
      "choseh",
      "indegs",
      "alleyswonderlab",
      "eosdaq",
      "keycat",
      "naverlabs",
    ];

    Promise.all(
      fileNames.map(
        (name) => import(`./data/${name}.${lang === "ko" ? "md" : "en.md"}`)
      )
    ).then((c) => setSources(c.map((module) => module.default)));
  }, [lang]);

  return (
    <>
      {sources.map((source, id) => (
        <Markdown key={id} source={source}></Markdown>
      ))}
    </>
  );
};

export default Portfolio;
