import styled from "@emotion/styled";
import { colors } from "style.types";

const OptionBox = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  padding-left: 12px;
  color: ${colors.textGrey};
  cursor: default;
`;

const Option = ({ innerProps, children }) => {
  return <OptionBox {...innerProps}>{children}</OptionBox>;
};

export default Option;
