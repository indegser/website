import styled from "@emotion/styled";

const OptionBox = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  padding-left: 12px;
  color: var(--text300);
  cursor: default;
`;

const Option = ({ innerProps, children }) => {
  return <OptionBox {...innerProps}>{children}</OptionBox>;
};

export default Option;
