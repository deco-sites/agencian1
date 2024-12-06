import { type PreviewPost } from "site/sdk/posts.ts";
import { type SocialMedia } from "site/components/Blog/PostShare.tsx";
import { clx } from "site/sdk/clx.ts";
import { invoke } from "site/runtime.ts";
import { useRef } from "preact/hooks";
import { render } from "preact";
import { PostItem } from "site/components/Blog/PostList.tsx";

interface Props {
  buttonText?: string;
  postsPerPage: number;
  socialMedia?: SocialMedia[];
}

export default function PostLoadMoreButton({
  buttonText = "Ver mais",
  postsPerPage,
  socialMedia,
}: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  async function handleClick() {
    const urlParams = new URLSearchParams(globalThis.location.search);
    const nextPage = Number(urlParams.get("page") ?? 1) + 1;

    const { posts, hasMorePosts } = await invoke.site.loaders.posts.posts({
      page: nextPage,
      postsPerPage,
      keyword: urlParams.get("keyword") ?? "",
      tag: urlParams.get("tag") ?? "",
      category: urlParams.get("category") ?? "",
      sort: urlParams.get("sort") ?? "date_desc",
    });

    const postList = document.getElementById("post-list");
    if (postList) {
      posts.forEach((post: PreviewPost) => {
        const postElement = document.createElement("div");
        render(<PostItem {...post} socialMedia={socialMedia} />, postElement);
        postList.appendChild(postElement);
      });
    }

    const newUrl = new URL(globalThis.location.href);
    newUrl.searchParams.set("page", nextPage.toString());
    globalThis.history.pushState({}, "", newUrl.toString());

    if (!hasMorePosts && buttonRef.current) {
      buttonRef.current.remove();
    }
  }

  return (
    <button
      ref={buttonRef}
      class={clx(
        "m-auto rounded-[100px] px-[30px] pt-[2px] leading-[48px] mobile:leading-[38px] bg-accent",
        "text-primary font-archimoto-medium text-16 mobile:text-14 font-black",
        "hover:bg-accent-hover duration-300",
      )}
      onClick={handleClick}
    >
      {buttonText}
    </button>
  );
}
