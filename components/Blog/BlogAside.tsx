import { clx } from "$store/sdk/clx.ts";
import BlogAsideSearch from "$store/components/Blog/BlogAsideSearch.tsx";
import BlogAsideNewsletter from "$store/components/Blog/BlogAsideNewsletter.tsx";
import BlogAsideCategories from "$store/components/Blog/BlogAsideCategories.tsx";
import BlogAsideTags from "$store/components/Blog/BlogAsideTags.tsx";

interface AsideSearch {
  titleSearch?: string;
  maskSearch?: string;
}

interface AsideNewsletter {
  titleNewsletter?: string;
  maskNewsletterName?: string;
  maskNewsletterEmail?: string;
  textButton?: string;
}

interface ArrayCategory {
  category?: string;
  count?: string;
}

interface AsideCategories {
  title?: string;
  arrayCategories?: ArrayCategory[];
}

interface AsideTags {
  title?: string;
  nameTag?: string[];
}

interface Aside {
  search?: AsideSearch;
  newsletter?: AsideNewsletter;
  categories?: AsideCategories;
  tag?: AsideTags;
}

interface Props {
  aside?: Aside;
}

function BlogAside({ aside }: Props) {
  return (
    <>
      <aside class={`n1-blog__aside md:w-[378px] mt-[40px] md:mt-0`}>
        <div
          class={clx(`flex flex-col gap-y-[30px] md:gap-y-[32px]  static md:sticky top-[103px]`)}
        >
          {aside?.search && <BlogAsideSearch search={aside.search} />}

          {aside?.newsletter && (
            <BlogAsideNewsletter newsletter={aside.newsletter} />
          )}

          {aside?.categories && (
            <BlogAsideCategories categories={aside.categories} />
          )}

          {aside?.tag && <BlogAsideTags tag={aside.tag} />}
        </div>
      </aside>
    </>
  );
}

export default BlogAside;