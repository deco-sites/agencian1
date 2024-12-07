import { type BlogPost } from "apps/blog/types.ts";
import { Head } from "$fresh/runtime.ts";
import { FALLBACK_BASE_URL } from "site/sdk/contants.tsx";

interface Props {
  post: BlogPost;
  baseUrl?: string;
}

function createSEOMetadata(post: BlogPost, baseUrl = "") {
  return {
    title: `N1.AG | ${
      (post.seo?.title?.length ?? 0) > 57
        ? `${post.seo?.title?.slice(0, 54)}...`
        : post.seo?.title
    }`,
    description: (post.seo?.description?.length ?? 0) > 320
      ? `${post.seo?.description?.slice(0, 317)}...`
      : post.seo?.description ?? post.content,
    image: post.seo?.image || post.image,
    canonical: post.seo?.canonical ||
      `${baseUrl ?? FALLBACK_BASE_URL}/blog/${post.slug}`,
  };
}

function createSchemaOrgData(post: BlogPost, baseUrl = "") {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seo?.description || post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    image: [post.seo?.image || post.image],
    articleBody: post.content.replace(/<[^>]*>/g, ""),
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${post.readTime}M`,
    keywords: post.extraProps?.find((p) => p.key === "keywords")?.value || "",
    author: {
      "@type": "Organization",
      name: post.authors?.[0]?.name ?? "Agência N1",
      email: post.authors?.[0]?.email,
      "@id": `${baseUrl ?? FALLBACK_BASE_URL}/quem-somos`,
    },
    publisher: {
      "@type": "Organization",
      name: "Agência N1",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl ?? FALLBACK_BASE_URL}/favicon-32x32.png`,
        "@id": `${baseUrl ?? FALLBACK_BASE_URL}/#logo`,
      },
      "@id": `${baseUrl ?? FALLBACK_BASE_URL}/quem-somos`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${post.slug}`,
    },
  };
}

export default function PostDetailsSEO({ post, baseUrl = "" }: Props) {
  const seo = createSEOMetadata(post, baseUrl);
  const schemaOrg = createSchemaOrgData(post, baseUrl);

  return (
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />

      {/* Open Graph */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.canonical} />
      {seo.image && <meta property="og:image" content={seo.image} />}
      <meta property="og:site_name" content="Agência N1 Blog" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={post.alt} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      {seo.image && <meta name="twitter:image" content={seo.image} />}
      <meta name="twitter:site" content="@AgenciaN1" />
      <meta name="twitter:creator" content="@AgenciaN1" />
      <meta name="twitter:label1" content="Tempo de leitura" />
      <meta name="twitter:data1" content={`${post.readTime} minutos`} />
      <meta name="twitter:label2" content="Categoria" />
      <meta name="twitter:data2" content={post.categories?.[0]?.name} />

      {/* Article metadata */}
      <meta property="article:published_time" content={post.date} />
      <meta property="article:author" content={post.authors?.[0]?.name} />
      <meta property="article:section" content={post.categories?.[0]?.name} />
      <meta
        property="article:tag"
        content={post.extraProps?.find((p) => p.key === "tags")?.value}
      />
      <meta property="article:read_time" content={`${post.readTime} minutes`} />

      <link rel="canonical" href={seo.canonical} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
    </Head>
  );
}
