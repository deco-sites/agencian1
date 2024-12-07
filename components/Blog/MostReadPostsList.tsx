import { type BlogPost } from "apps/blog/types.ts";
import { clx } from "site/sdk/clx.ts";
import PostTitle from "site/components/Blog/PostTitle.tsx";
import PostImage from "site/components/Blog/PostImage.tsx";
import PostContent from "site/components/Blog/PostContent.tsx";
import PostButton from "site/components/Blog/PostButton.tsx";

export interface Props {
  title?: string;
  posts?: BlogPost[];
}

export default function MostReadPostsList({
  title = "Posts mais acessados",
  posts,
}: Props) {
  if (!posts?.length) {
    return null;
  }

  return (
    <div class="flex flex-col gap-y-[30px]">
      <h2 class="text-24 font-archimoto-medium font-black text-white">
        {title}
      </h2>
      <div class="grid grid-cols-[1fr] md:grid-cols-[repeat(2,380px)] gap-[30px]">
        {posts.map((post) => <PostItem key={post.slug} {...post} />)}
      </div>
    </div>
  );
}

function PostItem({
  title,
  image,
  excerpt,
  slug,
  alt,
}: BlogPost) {
  const link = `/blog/${slug}`;
  return (
    <article
      class={clx(
        "flex flex-col gap-y-5 px-[20px] py-[30px] rounded-[10px]",
        "bg-[linear-gradient(181.01deg,_#FFFFFF_-176.1%,_rgba(255,_255,_255,_0.29)_-85.87%,_rgba(255,_255,_255,_0)_124.35%)]",
      )}
    >
      <PostImage
        link={link}
        src={image}
        alt={alt}
        borderRadius={10}
        height={300}
        width={340}
      />
      <PostTitle
        link={link}
        title={title}
        heading="h3"
        clamp={2}
        fontSizeDesktop={24}
        fontSizeMobile={20}
        leadingDesktop={28}
        leadingMobile={24}
      />
      <PostContent content={excerpt} />
      <PostButton link={link} text="Saiba mais" />
    </article>
  );
}
