import { styled } from "@src/common/stitches.config";
import { RenderElementProps } from "slate-react";
import { CustomBulletedList } from "@src/types/editor.types";

interface Props extends RenderElementProps {
  element: CustomBulletedList;
}

export const BulletedListBlock = (props: Props) => {
  return (
    <Container {...props.attributes}>
      <Pseudo contentEditable={false}>
        <PseudoContent>{"•"}</PseudoContent>
      </Pseudo>
      <Content>{props.children}</Content>
    </Container>
  );
};

const Container = styled("div", {
  display: "flex",
  alignItems: "flex-start",
  paddingLeft: 2,
  margin: "1px 0",
});

const Content = styled("div", {
  padding: "5px 2px",
});

const Pseudo = styled("div", {
  marginRight: 2,
  width: 24,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: "0 0 auto",
  marginTop: 5,
});

const PseudoContent = styled("div", {
  fontSize: "1.5em",
  lineHeight: 1,
  fontFamily: "Arial",
});
