import styled from "@emotion/styled";

const M15 = styled.span`
  font-weight: 500;
  font-size: 15px;
`;

const MarqueeTitle = styled.span`
  font-weight: 640;
  font-size: 16px;
  line-height: 1.5;
  padding-bottom: 1px;
  letter-spacing: -0.1px;
  /* background-image: linear-gradient(
    to right,
    rgba(55, 53, 47, 0.16) 0%,
    rgba(55, 53, 47, 0.16) 100%
  );
  background-repeat: repeat-x;
  background-position: 0px 100%;
  background-size: 100% 1px; */
`;

const MarqueeDesc = styled.span`
  font-size: 13px;
  font-weight: 400;
`;

const Typography = {
  M15,
  MarqueeTitle,
  MarqueeDesc,
};

export default Typography;
