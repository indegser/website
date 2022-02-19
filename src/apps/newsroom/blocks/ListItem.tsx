import styled from "@emotion/styled";
import { PropsWithChildren } from "react";

interface Props {
  attributes: any;
}

export const ListItem = ({
  children,
  attributes,
}: PropsWithChildren<Props>) => {
  return <Container {...attributes}>{children}</Container>;
};

const Container = styled.li`
  padding-left: 2px;
`;
