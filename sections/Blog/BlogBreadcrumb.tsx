import { AppContext } from "apps/blog/mod.ts";
import { fetchPostBySlug } from "site/sdk/posts.ts";
import { clx } from "site/sdk/clx.ts";
import BreadcrumbJsonLd from "site/components/Blog/SEO/BreadcrumbJsonLd.tsx";

export interface BreadcrumbItem {
  title: string;
  link?: string;
}

interface Props {
  /**
   * @title Título
   */
  title?: string;
  /**
   * @ignore
   */
  items?: BreadcrumbItem[];
  /**
   * @ignore
   */
  baseUrl?: string;
}

function BreadcrumbItem(
  { title, link, isLast }: BreadcrumbItem & { isLast: boolean },
) {
  if (isLast) {
    return (
      <li class="relative flex items-center">
        <span class="text-secondary inline-block !line-clamp-1">
          {title}
        </span>
      </li>
    );
  }

  return (
    <li class="relative flex items-center">
      <a
        href={link}
        class="hover:underline n1-breadcrumb__item inline-block"
      >
        {title}
      </a>
    </li>
  );
}

function Breadcrumb({ items, baseUrl }: Props) {
  return (
    <>
      <div class="max-w-[1440px] mx-auto px-[20px] lg:px-[120px] mb-[40px] mobile:mb-[20px]">
        <ul
          class={clx(
            "text-[#ffffff] h-[50px] px-[20px] pt-[4px]",
            "flex items-center gap-x-[35px]",
            "rounded-[100px] bg-[rgba(255,_255,_255,_0.10)]",
            "font-archimoto-medium text-14 font-black",
          )}
        >
          <BreadcrumbItem title="Home" link="/" isLast={false} />
          {items?.map((item, idx) => (
            <BreadcrumbItem
              {...item}
              isLast={items.length === idx + 1}
              key={item.title}
            />
          ))}
        </ul>
      </div>
      <BreadcrumbJsonLd items={items ?? []} baseUrl={baseUrl} />
    </>
  );
}

export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const url = new URL(req.url);
  const hasDetailPage = url.pathname.includes("/blog/") &&
    url.pathname !== "/blog";

  const items: BreadcrumbItem[] = [
    {
      title: props.title ?? "Blog",
      link: "/blog",
    },
  ];

  if (hasDetailPage) {
    const slug = url.pathname.split("/blog/")[1];
    const post = await fetchPostBySlug(ctx, slug);

    if (post?.title) {
      items.push({
        title: post.title,
        link: "",
      });
    }
  }

  return {
    ...props,
    items,
    baseUrl: url.origin,
  };
};

export default Breadcrumb;
