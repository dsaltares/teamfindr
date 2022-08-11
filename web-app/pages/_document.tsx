import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => (
  <Html>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1 maximum-scale=1.0, user-scalable=no"
      />
      <meta name="theme-color" content="#000000" />
      <meta
        name="description"
        content="Find people to play sports with nearby."
      />
      <meta
        name="google-site-verification"
        content="O1VzpmIxSrPW8QCHz7UZk5817zNxRND7pU2gxV9_XIQ"
      />

      <link rel="apple-touch-icon" href="/logo192.png" />
      <link rel="manifest" href="/manifest.json" />

      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin=""
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdn.wpcc.io/lib/1.0.2/cookieconsent.min.css"
      />
      <script
        src="https://cdn.wpcc.io/lib/1.0.2/cookieconsent.min.js"
        defer
      ></script>
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
