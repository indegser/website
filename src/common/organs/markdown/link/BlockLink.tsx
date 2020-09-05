import { FC } from "react";
import Gist from "../shortcode/Gist";

interface Props {
  href: string;
  alt?: string;
}

const BlockLink: FC<Props> = ({ href, alt }) => {
  if (href.includes("https://codesandbox")) {
    const url = new URL(href);
    url.searchParams.set("codemirror", "1");
    url.searchParams.set("hidedevtools", "1");
    url.searchParams.set("hidenavigation", "1");

    return (
      <iframe
        src={url.href}
        style={{
          width: "100%",
          height: "500px",
          border: 0,
          overflow: "hidden",
        }}
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      />
    );
  }

  if (href.includes("gist.github.com")) {
    return <Gist src={href} />;
  }

  return null;
};

export default BlockLink;
