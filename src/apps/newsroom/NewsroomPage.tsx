import styled from "@emotion/styled";

import { createPlugins, Plate } from "@udecode/plate-core";
import { createBasicMarksPlugin } from "@udecode/plate-basic-marks";
import { createBasicElementsPlugin } from "@udecode/plate-basic-elements";
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  KEYS_HEADING,
} from "@udecode/plate-heading";
import {
  createExitBreakPlugin,
  createSoftBreakPlugin,
} from "@udecode/plate-break";
import { createAutoformatPlugin } from "@udecode/plate-autoformat";
import { createKbdPlugin } from "@udecode/plate-kbd";
import { MarkdownContainer } from "common/atoms/Container";
import { mq } from "common/theme";
import { spacingVariables } from "common/variables";
import { colors } from "style.types";
import { Heading } from "./blocks/Heading";

export const NewsroomPage = () => {
  const initialValue = [
    {
      type: ELEMENT_H1,
      children: [{ text: "Hello1" }],
    },
    {
      type: ELEMENT_H2,
      children: [{ text: "Hello2" }],
    },
    {
      type: ELEMENT_H3,
      children: [{ text: "Hello3" }],
    },
  ];

  const editableProps = {
    placeholder: "Type…",
  };

  const plugins = createPlugins(
    [
      createBasicElementsPlugin(),
      createBasicMarksPlugin(),
      createKbdPlugin(),
      createExitBreakPlugin({
        options: {
          rules: [
            {
              hotkey: "enter",
              query: {
                start: true,
                end: true,
                allow: KEYS_HEADING,
              },
            },
          ],
        },
      }),
      createSoftBreakPlugin({
        options: {
          rules: [{ hotkey: "shift+enter" }],
        },
      }),
      createAutoformatPlugin({
        options: {
          rules: [
            {
              match: "# ",
              mode: "block",
              type: "h1",
            },
            {
              match: "## ",
              mode: "block",
              type: "h2",
            },
            {
              match: "### ",
              mode: "block",
              type: "h3",
            },
            { mode: "text", match: "->", format: "→" },
            { mode: "text", match: "<-", format: "←" },
            { mode: "text", match: "=>", format: "⇒" },
            { mode: "text", match: "<=", format: "⇐" },
          ],
        },
      }),
    ],
    {
      components: {
        p: (props) => {
          return <p>{props.children}</p>;
        },
        h1: Heading,
        h2: Heading,
        h3: Heading,
      },
    }
  );

  return (
    <MarkdownContainer>
      <Container>
        <Plate
          editableProps={editableProps}
          initialValue={initialValue}
          plugins={plugins}
        />
      </Container>
    </MarkdownContainer>
  );
};

const Container = styled.div`
  font-size: 16px;
  font-weight: 420;
  line-height: 1.75;
  color: ${colors.gray800};

  ${spacingVariables.markdownPadding}: 0px;

  ${mq("md")} {
    font-weight: 440;
    font-size: 17px;
  }

  p {
    margin-top: 0;
    white-space: pre-wrap;
    word-break: break-word;
  }

  strong {
    font-weight: 700;
  }

  blockquote {
    margin-left: 0;
    margin-right: 0;
    padding-left: 1em;
    border-left: 4px solid ${colors.gray700};
    box-sizing: border-box;
    margin: 2em auto;
    font-weight: 500;
  }

  sup {
    line-height: 1;
    padding: 0 2px;
    font-size: 80%;
  }

  a {
    color: ${colors.linkPrimary};

    &:hover {
      color: ${colors.linkPrimaryHover};
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin-top: 3rem;
    line-height: 1.24;
    color: ${colors.gray900};
  }

  ol {
    padding-inline-start: 1.5em;
  }

  code,
  pre {
    padding: 4px 6px;
    border-radius: 0.2em;
    background: ${colors.gray50};
    font-size: 0.9em;
    margin-right: 4px;
  }
`;
