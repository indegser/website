import styled from "@emotion/styled";
import { useFootnotes } from "./Markdown.hooks";
import HashLink from "common/atoms/link/HashLink";
import Icon from "common/atoms/icons/Icon";
import { colors } from "style.types";

const Box = styled.div`
  margin-top: 40px;
  padding-top: 1rem;
  border-top: 1px solid ${colors.bgDivider};
  font-family: var(--font-sans);
`;

const Title = styled.div`
  margin: 0;
  font-size: 15px;
  font-weight: 500;
  color: ${colors.textBlack};
  padding-bottom: 1rem;
`;

const Footnote = styled.div`
  position: relative;
  font-size: 13px;
  color: ${colors.textGrey};
  display: grid;
  grid-template-columns: max-content max-content auto;
  grid-gap: 0px;
  align-items: flex-start;
  line-height: 1.6;

  margin-top: 0.5em;

  > p {
    margin: 0;
  }
`;

const Id = styled.div`
  font-weight: 500;
  color: ${colors.textBlack};
`;

const Backlink = styled.div`
  color: ${colors.linkPrimary};
  padding: 0 4px;

  sup {
    line-height: 1;
  }
`;

const Footnotes = () => {
  const footnotes = useFootnotes();

  return (
    <Box>
      <Title>Footnotes</Title>
      <div>
        {footnotes.map(({ content }, i) => {
          const index = i + 1;
          const footnoteContent = !isNaN(Number(content))
            ? `Above book, p.${content}`
            : content;
          return (
            <Footnote id={`cite-def-${index}`} key={index}>
              <Id>{index}.</Id>
              <Backlink>
                <HashLink href={`#cite-ref-${index}`}>
                  <sup>
                    <Icon
                      variant="footnoteLink"
                      width={8}
                      height={8}
                      style={{
                        display: "inline-block",
                      }}
                      fill="currentColor"
                    />
                  </sup>
                </HashLink>
              </Backlink>
              <div dangerouslySetInnerHTML={{ __html: footnoteContent }}></div>
            </Footnote>
          );
        })}
      </div>
    </Box>
  );
};

export default Footnotes;
