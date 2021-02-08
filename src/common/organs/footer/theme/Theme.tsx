import { useTheme } from "./Theme.hooks";
import styled from "@emotion/styled";
import Icon from "common/atoms/icons/Icon";
import Select from "common/atoms/form/select/Select";
import { colors } from "style.types";

const Box = styled.div`
  flex: 0 0 auto;
  grid-area: theme;
  max-width: 140px;
  justify-self: flex-end;
`;

const OptionBox = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  padding-left: 12px;
  cursor: default;
`;

const OptionText = styled.span`
  padding-left: 12px;
  color: ${colors.textGrey};
`;

const Option = ({ innerProps, data }) => {
  return (
    <OptionBox {...innerProps}>
      <Icon variant={`${data.value}Theme` as any} />
      <OptionText>{data.label}</OptionText>
    </OptionBox>
  );
};

const SingleValue = ({ data }) => {
  return (
    <OptionBox>
      <Icon variant={`${data.value}Theme` as any} />
    </OptionBox>
  );
};

const Theme = () => {
  const { theme, handleChange } = useTheme();

  if (!theme) return null;

  const options = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
  ];

  return (
    <Box>
      <Select
        value={options.find((o) => o.value === theme)}
        isSearchable={false}
        menuPlacement="top"
        options={options}
        onChange={handleChange}
        styles={{
          menu: (base) => {
            return {
              ...base,
              width: 120,
              right: 0,
              background: colors.bgPaper,
            };
          },
          control: (base) => {
            return {
              ...base,
              background: colors.bgPaper,
              borderColor: colors.bgDivider,
            };
          },
          valueContainer: (base) => {
            return {
              ...base,
              padding: 0,
            };
          },
        }}
        components={{ Option, SingleValue }}
      ></Select>
    </Box>
  );
};

export default Theme;
