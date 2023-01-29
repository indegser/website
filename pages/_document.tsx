import { Html, Head, Main, NextScript } from "next/document";

import { noFlash } from "@src/design/theme/noFlash";
import { getCssText } from "@src/design/theme/stitches.config";

export default function Document() {
  return (
    <Html>
      <Head>
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </Head>
      <body>
        <script id="no-flash" async={false} dangerouslySetInnerHTML={{ __html: noFlash }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
