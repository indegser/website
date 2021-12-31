import { useIndegserContext } from "../Indegser.hooks";
import { useState, useEffect } from "react";
import { MarkdownContainer } from "common/atoms/Container";

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

  return <MarkdownContainer></MarkdownContainer>;
};

export default Portfolio;
