import { type BlogPost } from "apps/blog/types.ts";
import { type SocialMedia } from "./PostShare.tsx";
import { clx } from "site/sdk/clx.ts";
import PostTitle from "site/components/Blog/PostTitle.tsx";
import PostShare from "./PostShare.tsx";
import PostImage from "site/components/Blog/PostImage.tsx";
import PostContent from "site/components/Blog/PostContent.tsx";
import PostButton from "site/components/Blog/PostButton.tsx";

interface Props {
  posts: BlogPost[];
  socialMedia?: SocialMedia[];
}

export default function PostList({ posts, socialMedia }: Props) {
  if (posts.length === 0) {
    return (
      <p class="mx-auto text-white text-[20px]">Nenhuma postagem encontrada</p>
    );
  }
  return (
    <main class="flex flex-col gap-y-[30px]" id="post-list">
      {posts.map((post) => (
        <PostItem key={post.slug} {...post} socialMedia={socialMedia} />
      ))}
    </main>
  );
}

export function PostItem(
  { title, image, alt, slug, excerpt, socialMedia }: BlogPost & {
    socialMedia?: SocialMedia[];
  },
) {
  const link = `/blog/${slug}`;
  return (
    <article
      class={clx(
        "flex flex-col gap-y-5 px-[20px] py-[30px] rounded-[10px]",
        "bg-[linear-gradient(181.01deg,_#FFFFFF_-176.1%,_rgba(255,_255,_255,_0.29)_-85.87%,_rgba(255,_255,_255,_0)_124.35%)]",
      )}
    >
      <PostTitle link={link} title={title} />
      <PostShare socialMedia={socialMedia} />
      <PostImage
        link={link}
        src={image}
        alt={alt}
        borderRadius={10}
        height={265}
        width={750}
      />
      <PostContent content={excerpt} clamp={2} />
      <PostButton link={link} text="Continue lendo" />
    </article>
  );
}
