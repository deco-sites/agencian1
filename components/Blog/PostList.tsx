import { type BlogPost } from "apps/blog/types.ts";
import { type SocialMedia } from "./PostShare.tsx";
import { clx } from "site/sdk/clx.ts";
import PostTitle from "site/components/Blog/PostTitle.tsx";
import PostShare from "site/islands/Blog/PostShare.tsx";
import PostImage from "site/components/Blog/PostImage.tsx";
import PostContent from "site/components/Blog/PostContent.tsx";
import PostButton from "site/components/Blog/PostButton.tsx";

interface Props {
  posts: BlogPost[];
  socialMedia?: SocialMedia[];
  searchQuery?: string;
}

export default function PostList({ posts, socialMedia, searchQuery }: Props) {
  if (posts.length === 0) {
    return <NoPostsFound searchQuery={searchQuery} />;
  }
  return (
    <main class="flex flex-col gap-y-[30px]" id="post-list">
      {posts.map((post, index) => (
        <PostItem
          key={post.slug}
          {...post}
          socialMedia={socialMedia}
          isFirst={index === 0}
        />
      ))}
    </main>
  );
}

export function PostItem(
  { title, image, alt, slug, excerpt, socialMedia, seo, isFirst = false }:
    & BlogPost
    & {
      socialMedia?: SocialMedia[];
      isFirst?: boolean;
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
      <PostShare socialMedia={socialMedia} seoTitle={seo?.title} />
      <PostImage
        link={link}
        src={image}
        alt={alt}
        borderRadius={10}
        height={265}
        width={750}
        eager={isFirst}
      />
      <PostContent content={excerpt} clamp={2} />
      <PostButton link={link} text="Continue lendo" />
    </article>
  );
}

function NoPostsFound({ searchQuery }: { searchQuery?: string }) {
  return (
    <div class="flex flex-col items-center gap-6">
      <h2 class="font-archimoto-medium text-32 text-white text-center">
        {searchQuery
          ? "Nenhum resultado encontrado"
          : "Nenhuma postagem encontrada"}
      </h2>
      {searchQuery
        ? (
          <p class="font-montserrat text-20 text-base-400 text-center max-w-xl">
            Não encontramos resultados para "<span class="text-white">
              {searchQuery}
            </span>". Tente usar termos diferentes ou explore outros conteúdos
            do nosso blog.
          </p>
        )
        : (
          <p class="font-montserrat text-20 text-base-400 text-center max-w-xl">
            Não há postagens disponíveis no momento. Volte em breve para novos
            conteúdos.
          </p>
        )}
      {searchQuery && (
        <a
          href="/blog"
          class={clx(
            "mx-auto rounded-[100px] px-[30px] pt-[2px] leading-[48px] mobile:leading-[38px]",
            "bg-tertiary hover:bg-accent-hover duration-300",
            "text-primary font-archimoto-medium text-16 mobile:text-14 font-black",
          )}
        >
          Ver todas as postagens
        </a>
      )}
    </div>
  );
}
