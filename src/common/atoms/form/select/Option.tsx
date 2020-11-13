import styled from "@emotion/styled";
import { COLORS } from "common/theme";

const OptionBox = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  padding-left: 12px;
  color: ${COLORS.textGrey};
  cursor: default;
`;

const Option = ({ innerProps, children }) => {
  return <OptionBox {...innerProps}>{children}</OptionBox>;
};

export default Option;
