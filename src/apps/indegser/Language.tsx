import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { useIndegserContext } from "./Indegser.hooks";

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

  return null;
  // return (
  //   <Select
  //     chromeless
  //     value={options.find((o) => o.value === lang)}
  //     onChange={handleChange}
  //     options={options}
  //     isSearchable={false}
  //     styles={{
  //       container: (base) => {
  //         return {
  //           ...base,
  //           alignSelf: "center",
  //         };
  //       },
  //     }}
  //     components={{
  //       SingleValue: ({ data }) => {
  //         const name = data.value === "en" ? "EN" : data.label;
  //         return <LangValue>{name}</LangValue>;
  //       },
  //     }}
  //   ></Select>
  // );
};

export default Language;
