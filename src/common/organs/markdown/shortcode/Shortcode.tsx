import Youtube from "./Youtube";
import Gist from "./Gist";

const shortcodeMap = {
  youtube: Youtube,
  gist: Gist,
};

const Shortcode = ({ identifier, attributes }) => {
  const Component = shortcodeMap[identifier];
  if (!Component) return null;

  return <Component {...attributes} />;
};

export default Shortcode;
