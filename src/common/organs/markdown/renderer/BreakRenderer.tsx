import styled from "@emotion/styled";
import { COLORS } from "common/theme";

const Break = styled.div`
  margin: 36px 0;
  display: flex;
  font-size: 16px;
  color: ${COLORS.bgDivider};
  justify-content: center;

  & > div {
    letter-spacing: 1px;
  }
`;

const BreakRenderer = () => {
  return (
    <Break>
      <div>***</div>
    </Break>
  );
};

export default BreakRenderer;
