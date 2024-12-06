import { type PreviewPost, type SortBy } from "site/sdk/posts.ts";
import { type SocialMedia } from "site/components/Blog/PostShare.tsx";
import { clx } from "site/sdk/clx.ts";
import { invoke } from "site/runtime.ts";
import { useRef } from "preact/hooks";
import { render } from "preact";
import { PostItem } from "site/components/Blog/PostList.tsx";
import { useSignal } from "@preact/signals";

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
  const isLoading = useSignal(false);

  async function handleClick() {
    if (isLoading.value) return;
    isLoading.value = true;

    const urlParams = new URLSearchParams(globalThis.location.search);
    const nextPage = Number(urlParams.get("page") ?? 1) + 1;

    try {
      const { posts, hasMorePosts } = await invoke.site.loaders.posts.posts({
        page: nextPage,
        postsPerPage,
        keyword: urlParams.get("keyword") ?? "",
        tag: urlParams.get("tag") ?? "",
        category: urlParams.get("category") ?? "",
        sort: (urlParams.get("sort") as SortBy) ?? "date_desc",
      });

      const postList = document.getElementById("post-list");
      if (postList) {
        let firstNewPostElement: HTMLElement | null = null;

        posts.forEach((post: PreviewPost, index: number) => {
          const postElement = document.createElement("div");
          render(<PostItem {...post} socialMedia={socialMedia} />, postElement);
          postElement.style.opacity = "0";
          postElement.style.transform = "translateY(20px)";
          postElement.style.transition = "all 0.3s ease";
          postList.appendChild(postElement);

          if (index === 0) {
            firstNewPostElement = postElement;
          }

          setTimeout(() => {
            postElement.style.opacity = "1";
            postElement.style.transform = "translateY(0)";
          }, index * 100);
        });

        if (firstNewPostElement) {
          setTimeout(() => {
            firstNewPostElement?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }, 100);
        }
      }

      const newUrl = new URL(globalThis.location.href);
      newUrl.searchParams.set("page", nextPage.toString());
      globalThis.history.pushState({}, "", newUrl.toString());

      if (!hasMorePosts && buttonRef.current) {
        buttonRef.current.remove();
      }
    } finally {
      isLoading.value = false;
    }
  }

  return (
    <button
      ref={buttonRef}
      disabled={isLoading.value}
      class={clx(
        "m-auto rounded-[100px] px-[30px] pt-[2px] leading-[48px] mobile:leading-[38px] bg-accent",
        "text-primary font-archimoto-medium text-16 mobile:text-14 font-black",
        "hover:bg-accent-hover duration-300",
        "disabled:opacity-70 disabled:cursor-wait",
      )}
      onClick={handleClick}
    >
      {isLoading.value ? "Carregando..." : buttonText}
    </button>
  );
}
