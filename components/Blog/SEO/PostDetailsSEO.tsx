import { Head } from "$fresh/runtime.ts";
import { type BlogPost } from "apps/blog/types.ts";

interface Props {
  post: BlogPost;
  baseUrl?: string;
}

export default function PostDetailsSEO({ post, baseUrl }: Props) {
  const seoTitle = `N1.AG | ${
    (post.seo?.title?.length ?? 0) > 57
      ? `${post.seo?.title?.slice(0, 54)}...`
      : post.seo?.title
  }`;
  const seoDescription = (post.seo?.description?.length ?? 0) > 320
    ? `${post.seo?.description?.slice(0, 317)}...`
    : post.seo?.description ?? post.content;
  const seoImage = post.seo?.image || post.image;
  const canonicalUrl = post.seo?.canonical || `${baseUrl}/blog/${post.slug}`;

  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": seoDescription,
    "datePublished": post.date,
    "dateModified": post.date,
    "image": seoImage,
    "author": {
      "@type": "Person",
      "name": post.authors?.[0]?.name ?? "Agência N1",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Agência N1",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/favicon-32x32.png`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  return (
    <Head>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />

      {/* Open Graph */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:url" content={canonicalUrl} />
      {seoImage && <meta property="og:image" content={seoImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      {seoImage && <meta name="twitter:image" content={seoImage} />}

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    </Head>
  );
}
