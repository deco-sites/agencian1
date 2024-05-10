import { Head } from "$fresh/runtime.ts";

interface Props {
  /**
   * @title URL
   * @description (caso seja home, coloca a URL completa ex: https://www.n1.ag/ )
   */
  url?: string;
}

function UrlCanonical({ url }: Props) {
  if (!url) return false;
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": url,
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": url + "?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      >
      </script>
    </Head>
  );
}

export default UrlCanonical;
