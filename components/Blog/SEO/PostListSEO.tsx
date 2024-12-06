import { Head } from "$fresh/runtime.ts";
import { type BlogPost } from "apps/blog/types.ts";

type Props = {
  posts: BlogPost[];
};

export default function PostListSEO({ posts }: Props) {
  const uniquePosts = Array.from(
    new Set(posts.map((post) => post.slug)),
  ).map((slug) => posts.find((post) => post.slug === slug)!);

  const data = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "blogPost": uniquePosts.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.content,
      "datePublished": post.date,
      "author": {
        "@type": "Person",
        "name": post.authors?.[0]?.name ?? "Agência N1",
      },
      "url": `/blog/${post.slug}`,
    })),
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
