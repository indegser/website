import Youtube from "./Youtube";

const shortcodeMap = {
  youtube: Youtube,
};

const Shortcode = ({ identifier, attributes }) => {
  const Component = shortcodeMap[identifier];
  if (!Component) return null;

  return <Component {...attributes} />;
};

export default Shortcode;
