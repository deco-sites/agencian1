import { Head } from "$fresh/runtime.ts";
import { type BreadcrumbItem } from "site/sections/Blog/BlogBreadcrumb.tsx";

const FALLBACK_BASE_URL = "https://n1.ag";

export default function BreadcrumbJsonLd({
  items,
  baseUrl,
}: {
  items: BreadcrumbItem[];
  baseUrl?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl ?? FALLBACK_BASE_URL,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${baseUrl ?? FALLBACK_BASE_URL}/blog`,
      },
      ...items.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 3,
        name: item.title,
        item: item.link,
      })),
    ],
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    </Head>
  );
}
