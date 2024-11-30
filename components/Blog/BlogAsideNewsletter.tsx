import { clx } from "$store/sdk/clx.ts";
import type { JSX } from "preact";

export interface AsideNewsletter {
  /**
   * @title Nome do campo Newsletter
   * @format html
   */
  titleNewsletter?: string;
  maskNewsletterName?: string;
  maskNewsletterEmail?: string;
  textButton?: string;
}

export interface Props {
  newsletter?: AsideNewsletter;
}

function BlogAsideNewsletter({ newsletter }: Props) {
  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const { target } = e;
    if (!target) return;

    const email = (e.currentTarget.elements.namedItem("email") as RadioNodeList)
      ?.value;
    const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
      ?.value;

    const news = e.currentTarget.closest(".news");
    const inputElement = news?.querySelectorAll<HTMLInputElement>("input");
    const loadingElement = news?.querySelector<HTMLElement>(".is-loading");
    const message = news?.querySelector<HTMLElement>(".is-sucess");
    const form = news?.querySelector<HTMLElement>("form");

    if (email.trim().length && name.trim().length) {
      try {
        loadingElement?.classList.remove("hidden");
        const response = await fetch("/api/newsletterform", {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: {
            "content-type": "application/json",
            accept: "application/json",
          },
        });

        if (!response.ok) return;
      } catch (err) {
        loadingElement?.classList.add("hidden");
        console.log("error: ", (err as Error).message);
      } finally {
        inputElement?.forEach((a) => (a.value = ""));
        loadingElement?.classList.add("hidden");
        e.currentTarget?.classList.add("hidden");

        message?.classList.remove("hidden");
        message?.classList.add("flex");
        form?.classList.add("hidden");

        setTimeout(() => {
          // e.currentTarget?.classList.remove("hidden");
          // message?.classList.add("hidden");
          // message?.classList.remove("flex");
        }, 5000);
      }
    }
  };
  return (
    <div class="news">
      {newsletter?.titleNewsletter && (
        <div
          class={clx(
            `mb-[20px] [&_*]:text-24 [&_*]:font-archimoto-medium [&_*]:font-black`,
          )}
          dangerouslySetInnerHTML={{ __html: newsletter.titleNewsletter }}
        >
        </div>
      )}
      <form class={clx(`flex flex-col gap-y-[20px]`)} onSubmit={handleSubmit}>
        {newsletter?.maskNewsletterName && (
          <input
            id="name"
            name="name"
            type="text"
            placeholder={newsletter?.maskNewsletterName}
            class={clx(
              `rounded-[100px] py-[14px] px-[20px] max-h-[48px] bg-[#ffffff]
                            font-normal text-primary text-[14px] leading-[18.2px] font-noto-sans outline-none`,
            )}
          />
        )}
        {newsletter?.maskNewsletterEmail && (
          <input
            id="email"
            type="email"
            name="email"
            placeholder={newsletter?.maskNewsletterEmail}
            class={clx(
              `rounded-[100px] py-[14px] px-[20px] max-h-[48px] bg-[#ffffff]
                            font-normal text-primary text-[14px] leading-[18.2px] font-noto-sans outline-none`,
            )}
          />
        )}

        {newsletter?.textButton && (
          <div>
            <button
              class={clx(`
                                mt-[10px] py-[15px] px-[20px] rounded-[100px]  bg-accent hover:bg-[#F8BC33] text-primary flex items-center
                                text-[14px] leading-[14px] font-archimoto-medium font-black max-h-[40px]
                            `)}
            >
              {newsletter?.textButton}
            </button>
          </div>
        )}
      </form>
      <div class="hidden is-loading"></div>
      <div class="is-sucess hidden h-[150px]  flex-col gap-[20px] rounded-[10px] bg-[#232a3d] items-center justify-center self-stretch">
        <svg
          width="40"
          height="41"
          viewBox="0 0 40 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="circle-check">
            <path
              id="Icon"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M19.9999 37.1667C29.2047 37.1667 36.6666 29.7048 36.6666 20.5C36.6666 11.2953 29.2047 3.83334 19.9999 3.83334C10.7952 3.83334 3.33325 11.2953 3.33325 20.5C3.33325 29.7048 10.7952 37.1667 19.9999 37.1667ZM27.8913 16.6305C28.5156 15.9541 28.4734 14.8997 27.7971 14.2753C27.1207 13.651 26.0663 13.6932 25.4419 14.3696L17.4358 23.0428L14.5579 19.9251C13.9336 19.2487 12.8792 19.2066 12.2028 19.8309C11.5264 20.4552 11.4842 21.5097 12.1086 22.186L16.2112 26.6305C16.5267 26.9723 16.9707 27.1667 17.4358 27.1667C17.901 27.1667 18.345 26.9723 18.6605 26.6305L27.8913 16.6305Z"
              fill="#3CCBDA"
            />
          </g>
        </svg>
        <span class="text-14 font-normal text-white">
          Cadastro feito com sucesso!
        </span>
      </div>
    </div>
  );
}

export function LoadingFallback() {
  return <></>;
}

export default BlogAsideNewsletter;
