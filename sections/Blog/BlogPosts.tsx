import { BlogPost } from "apps/blog/types.ts";
import { AppContext } from "apps/blog/mod.ts";
import Image from "apps/website/components/Image.tsx";

export interface CTA {
  text?: string;
}

export interface Props {
  posts?: BlogPost[] | null;
  cta?: CTA;
  pagination?: {
    /**
     * @title First page
     * @description Leave it as 0 to start from the first page
     */
    page?: number;
    /** @title items per page */
    perPage?: number;
  };
}

export default function BlogPosts({
  //   cta = { text: "Show more" },
  posts,
}: //   pagination: { page = 0, perPage = 6 } = {},
Props) {
  console.log(posts);

  return (
    <div class="flex flex-col gap-4">
      {posts?.map((post, index) => (
        <div key={index} class="flex flex-col p-5 items-start gap-4">
          <h2>{post?.title}</h2>
          <Image
            className="w-full object-cover aspect-video max-h-[600px] rounded-2xl"
            width={600}
            src={post?.image || ""}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: post?.content,
            }}
          ></div>
        </div>
      ))}
    </div>
  );
}

export const loader = async (
  _: unknown,
  _req: Request,
  ctx: AppContext
): Promise<Props> => {
  const posts = await ctx.invoke.blog.loaders.BlogpostList({
    count: 2,
  });
  console.log("posts", posts);
  return {
    posts,
  };
};
