import ReactSelect, { Styles } from "react-select";
import { ComponentProps, FC } from "react";
import Option from "./Option";
import Icon from "common/atoms/icons/Icon";
import styled from "@emotion/styled";

interface Props extends ComponentProps<typeof ReactSelect> {
  chromeless?: boolean;
}

const Indicator = styled.div`
  padding-right: 4px;
`;

const Select: FC<Props> = ({
  children,
  components = {},
  styles = {},
  ...props
}) => {
  const mergeStyles = (key: keyof Styles) => {
    const styleFn = styles[key];
    if (!styleFn) {
    }
  };
  const defaultStyles = {
    menu: (base) => {
      return {
        ...base,
        right: 0,
        minWidth: 120,
        background: `var(--background)`,
      };
    },
    valueContainer: (base) => {
      return {
        ...base,
        padding: "0 8px",
        lineHeight: 1,
      };
    },
    control: (base) => {
      return {
        ...base,
        background: `var(--background)`,
        borderColor: `var(--border100)`,
        ...(props.chromeless
          ? {
              border: "none !important",
              minHeight: 0,
            }
          : {}),
      };
    },
  };
  const mergedStyles = Object.keys(styles).reduce((res, key) => {
    const fn = (base) => {
      const defaultStyleFn = defaultStyles[key];
      const defaultStyle = defaultStyleFn ? defaultStyleFn(base) : base;

      return styles[key](defaultStyle);
    };
    res[key] = fn;
    return res;
  }, {});

  return (
    <ReactSelect
      styles={{
        ...defaultStyles,
        ...mergedStyles,
      }}
      components={{
        Option,
        IndicatorsContainer: () => (
          <Indicator>
            <Icon variant="select" />
          </Indicator>
        ),
        ...components,
      }}
      {...props}
    />
  );
};

export default Select;
