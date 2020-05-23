import Select from "common/atoms/form/select/Select";
import styled from "@emotion/styled";
import { useIndegserLangStore } from "./Indegser.hooks";

const LangValue = styled.span`
  color: var(--text300);
  font-size: 13px;
`;

const Language = () => {
  const lang = useIndegserLangStore((s) => s.lang);
  const changeLang = useIndegserLangStore((s) => s.changeLang);

  const handleChange = ({ value }) => {
    changeLang(value);
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
