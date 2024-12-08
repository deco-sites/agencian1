import { type BlogPost } from "apps/blog/types.ts";
import { type SocialMedia } from "site/components/Blog/PostShare.tsx";
import { clx } from "site/sdk/clx.ts";
import { getUniqueTags } from "site/sdk/posts.ts";
import PostShare from "site/islands/Blog/PostShare.tsx";
import PostTitle from "site/components/Blog/PostTitle.tsx";
import PostImage from "site/components/Blog/PostImage.tsx";
import PostContent from "site/components/Blog/PostContent.tsx";
import SidebarTags from "site/components/Blog/SidebarTags.tsx";

interface Props {
  post?: BlogPost;
  socialMedia?: SocialMedia[];
}

export default function PostDetails({ post, socialMedia }: Props) {
  if (!post) return <PostNotFound />;

  const { title, image, alt, content, seo } = post;

  const tags = getUniqueTags([post]);

  return (
    <main class="flex flex-col gap-y-[30px]">
      <article
        class={clx(
          "flex flex-col gap-y-5 px-[20px] py-[30px] rounded-[10px]",
          "bg-[linear-gradient(181.01deg,_#FFFFFF_-176.1%,_rgba(255,_255,_255,_0.29)_-85.87%,_rgba(255,_255,_255,_0)_124.35%)]",
        )}
      >
        <PostTitle title={title} heading="h1" />
        <PostShare socialMedia={socialMedia} seoTitle={seo?.title} />
        <PostImage
          src={image}
          alt={alt}
          borderRadius={10}
          height={265}
          width={750}
          eager
        />
        <PostContent content={content} />
        <SidebarTags title="Nuvem com tags" heading="h2" tags={tags} />
      </article>
    </main>
  );
}

function PostNotFound() {
  return (
    <div class="flex flex-col items-center gap-6">
      <h2 class="font-archimoto-medium text-32 text-white text-center">
        Ops! Postagem não encontrada
      </h2>
      <p class="font-montserrat text-20 text-base-400 text-center max-w-xl">
        Não conseguimos encontrar a postagem que você está procurando. Que tal
        explorar outros conteúdos do nosso blog?
      </p>
      <a
        href="/blog"
        class={clx(
          "mx-auto rounded-[100px] px-[30px] pt-[2px] leading-[48px] mobile:leading-[38px]",
          "bg-tertiary hover:bg-accent-hover duration-300",
          "text-primary font-archimoto-medium text-16 mobile:text-14 font-black",
        )}
      >
        Voltar para o Blog
      </a>
    </div>
  );
}
