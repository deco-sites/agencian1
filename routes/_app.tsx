import { asset, Head } from "$fresh/runtime.ts";
import { defineApp } from "$fresh/server.ts";
import Theme from "$store/sections/Theme/Theme.tsx";
import { Context } from "deco/deco.ts";

const sw = () =>
  addEventListener("load", () =>
    navigator && navigator.serviceWorker &&
    navigator.serviceWorker.register("/sw.js"));

export default defineApp(async (_req, ctx) => {
  const revision = await Context.active().release?.revision();

  return (
    <>
      {/* Include default fonts and css vars */}
      <Theme />

      {/* Include Icons and manifest */}
      <Head>
        {/* Enable View Transitions API */}
        <meta name="view-transition" content="same-origin" />

        {/* Tailwind v3 CSS file */}
        <link
          href={asset(`/styles.css?revision=${revision}`)}
          rel="stylesheet"
        />

        {/* Web Manifest */}
        <link rel="manifest" href={asset("/site.webmanifest")} />

        <link
          rel="preconnect"
          href={asset("/fonts/ArchimotoN1-Black.ttf")}
          as="font"
          type="font/woff2"
        />
        <link
          rel="preconnect"
          href={asset("/fonts/ArchimotoV01-Medium.ttf")}
          as="font"
          type="font/woff2"
        />
        <link
          rel="preconnect"
          href={asset("/fonts/ArchimotoN1-Regular.ttf")}
          as="font"
          type="font/woff2"
        />
      </Head>

      {/* Rest of Preact tree */}
      <ctx.Component />

      {/* Include service worker */}
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: `(${sw})();` }}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @font-face{
              font-family: 'ArchimotoN1-Black';
              src: url(${
            asset("/fonts/ArchimotoN1-Black.ttf")
          }) format('woff2');
              font-weight: normal;
              font-style: normal;                          
            }
           
            @font-face{
              font-family: 'ArchimotoV01-Medium';
              src: url(${
            asset("/fonts/ArchimotoV01-Medium.ttf")
          }) format('woff2');
              font-weight: normal;
              font-style: normal;                          
            };

            @font-face{
              font-family: 'ArchimotoN1-Regular';
              src: url(${
            asset("/fonts/ArchimotoN1-Regular.ttf")
          }) format('woff2');
              font-weight: normal;
              font-style: normal;                          
            };

            @font-face{
              font-family: 'ArchimotoN1-Thin';
              src: url(${asset("/fonts/ArchimotoN1-Thin.ttf")}) format('woff2');
              font-weight: normal;
              font-style: normal;                          
            };       
          `,
        }}
      />
    </>
  );
});
