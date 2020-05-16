import { useTheme, useThemeStore } from "./Theme.hooks";
import Select from "react-select";
import styled from "@emotion/styled";
import Icon from "common/atoms/icons/Icon";

const Box = styled.div`
  flex: 0 0 auto;
  max-width: 140px;
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
  color: var(--text300);
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
              background: `var(--background)`,
            };
          },
          control: (base) => {
            return {
              ...base,
              background: `var(--background)`,
              borderColor: `var(--border100)`,
            };
          },
          valueContainer: (base) => {
            return {
              ...base,
              padding: 0,
            };
          },
        }}
        components={{ Option, SingleValue, IndicatorsContainer: () => null }}
      ></Select>
    </Box>
  );
};

export default Theme;
