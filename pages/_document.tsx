import { Html, Head, Main, NextScript } from 'next/document';

import { getCssText } from '@src/design/theme/stitches.config';

export default function Document() {
  return (
    <Html lang="en-KR">
      <Head>
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
