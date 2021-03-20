import { useRouter } from "next/router";
import Select from "common/atoms/form/select/Select";
import styled from "@emotion/styled";
import { useIndegserContext } from "./Indegser.hooks";
import { colors } from "style.types";

const LangValue = styled.span`
  color: ${colors.textGrey};
  font-size: 13px;
`;

const Language = () => {
  const router = useRouter();
  const { lang } = useIndegserContext();

  const handleChange = ({ value }) => {
    router.replace({
      pathname: router.pathname,
      query: {
        lang: value,
      },
    });
  };

  const options = [
    { value: "en", label: "English" },
    { value: "ko", label: "한글" },
  ];

  return (
    <Select
      chromeless
      value={options.find((o) => o.value === lang)}
      onChange={handleChange}
      options={options}
      isSearchable={false}
      styles={{
        container: (base) => {
          return {
            ...base,
            alignSelf: "center",
          };
        },
      }}
      components={{
        SingleValue: ({ data }) => {
          const name = data.value === "en" ? "EN" : data.label;
          return <LangValue>{name}</LangValue>;
        },
      }}
    ></Select>
  );
};

export default Language;
