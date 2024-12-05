import { type BlogPost } from "apps/blog/types.ts";
import { type SocialMedia } from "site/components/Blog/PostShare.tsx";
import { clx } from "site/sdk/clx.ts";
import PostTitle from "site/components/Blog/PostTitle.tsx";
import PostShare from "site/components/Blog/PostShare.tsx";
import PostImage from "site/components/Blog/PostImage.tsx";
import PostContent from "site/components/Blog/PostContent.tsx";
import SidebarTags from "site/components/Blog/SidebarTags.tsx";
import { getUniqueTags } from "site/sdk/posts.ts";

interface Props {
  post?: BlogPost;
  socialMedia?: SocialMedia[];
}

export default function PostDetails({ post, socialMedia }: Props) {
  if (!post) {
    return (
      <p class="mx-auto text-white text-[20px]">Nenhuma postagem encontrada</p>
    );
  }

  const { title, image, alt, content } = post;

  const tags = getUniqueTags([post]);

  return (
    <main class="flex flex-col gap-y-[30px]">
      <article
        class={clx(
          "flex flex-col gap-y-5 px-[20px] py-[30px] rounded-[10px]",
          "bg-[linear-gradient(181.01deg,_#FFFFFF_-176.1%,_rgba(255,_255,_255,_0.29)_-85.87%,_rgba(255,_255,_255,_0)_124.35%)]",
        )}
      >
        <PostTitle title={title} />
        <PostShare socialMedia={socialMedia} />
        <PostImage
          src={image}
          alt={alt}
          borderRadius={10}
          height={265}
          width={750}
        />
        <PostContent content={content} />
        <SidebarTags title="Nuvem com tags" tags={tags} />
      </article>
    </main>
  );
}
