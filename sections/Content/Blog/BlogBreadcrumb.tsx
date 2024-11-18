import { AppContext } from "apps/blog/mod.ts";
import { BlogPost } from "apps/blog/types.ts";
import { getRecordsByPath } from "apps/blog/utils/records.ts";

interface BreadcrumbItem {
  /**@title Nome da Categoria */
  /**@description (ex: Serviços) */
  category?: string;
  /**@title Link da Categoria */
  link?: string;
}

interface Props {
  /**@title Itens */
  /**@maxItems 1 */
  items?: BreadcrumbItem[];
}

function Breadcrumb({ items }: Props) {
  return (
    <>
      <div class="n1-breadcrumb md:n1-container md:px-[120px] mobile:px-[20px] py-[40px]">
        <ul class="text-[#ffffff] flex gap-x-[35px] rounded-[100px] bg-[rgba(255,_255,_255,_0.10)] p-[20px] font-archimoto-medium text-14 font-black">
          <li class="relative">
            <a href={"/"} class="n1-breadcrumb__item hover:underline">
              Home
            </a>
          </li>
          {items &&
            items?.map(({ category, link }, idx) => {
              const subcategory = items.length == idx + 1;

              if (subcategory) {
                return (
                  <>
                    <li class="relative">
                      <a class="text-secondary">{category}</a>
                    </li>
                  </>
                );
              } else {
                return (
                  <>
                    <li class="relative">
                      <a
                        href={link}
                        style={{ pointerEvents: "all" }}
                        class={`hover:underline n1-breadcrumb__item `}
                      >
                        {category}
                      </a>
                    </li>
                  </>
                );
              }
            })}
        </ul>
      </div>
    </>
  );
}

export const loader = async (props: Props, req: Request, ctx: AppContext) => {
  const hasDetailPage = new URLPattern({ pathname: "/nosso-blog/post" }).test(
    req.url
  );

  const items: Props["items"] = [
    {
      category: "Nosso Blog",
      link: "/nosso-blog",
    },
  ];

  if (hasDetailPage) {
    const url = new URL(req.url);
    const params = url.searchParams;
    const slug = params.get("slug") ?? "";
    const COLLECTION_PATH = "collections/blog/posts";
    const ACCESSOR = "post";

    const posts = await getRecordsByPath<BlogPost>(
      ctx,
      COLLECTION_PATH,
      ACCESSOR
    );

    const post = posts.find(({ slug: s }) => s == slug);
    if (post) {
      items.push({
        category: post?.categories?.[0]?.name,
        link: '',
      });
    }
  }

  return {
    ...props,
    items,
  };
};

export default Breadcrumb;
