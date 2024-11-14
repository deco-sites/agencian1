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
        console.log("error: ", err.message);
      } finally {

        inputElement?.forEach((a) => a.value = "");
        loadingElement?.classList.add("hidden");
        e.currentTarget?.classList.add("hidden");

        message?.classList.remove("hidden");
        message?.classList.add("block");

        setTimeout(() => {
          e.currentTarget?.classList.remove("hidden");
          message?.classList.add("hidden");
          message?.classList.remove("block");
        }, 5000);
      }
    }
  };
  return (
    <div class="news">
      <form class={clx(`flex flex-col gap-y-[20px]`)} onSubmit={handleSubmit}>
        {newsletter?.titleNewsletter && (
          <div
            name="email"
            htmlFor="email"
            class={clx(
              `[&_*]:text-24 [&_*]:font-archimoto-medium [&_*]:font-black`
            )}
            dangerouslySetInnerHTML={{ __html: newsletter.titleNewsletter }}
          ></div>
        )}
        {newsletter?.maskNewsletterName && (
          <input
            id="name"
            name="name"
            type="text"
            placeholder={newsletter?.maskNewsletterName}
            class={clx(
              `rounded-[100px] py-[14px] px-[20px] max-h-[48px] bg-[#ffffff]
                            font-normal text-primary text-[14px] leading-[18.2px] font-noto-sans outline-none`
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
                            font-normal text-primary text-[14px] leading-[18.2px] font-noto-sans outline-none`
            )}
          />
        )}

        {newsletter?.textButton && (
          <div>
            <button
              class={clx(`
                                mt-[10px] py-[15px] px-[20px] rounded-[100px] bg-accent text-primary flex items-center
                                text-[14px] leading-[14px] font-archimoto-medium font-black max-h-[40px]
                            `)}
            >
              {newsletter?.textButton}
            </button>
          </div>
        )}
      </form>
      <div class="hidden is-loading"></div>
        <span class="mt-4 is-sucess hidden font-noto-sans text-secondary mobile:text-14 md:text-16">
          E-mail enviado com sucesso!
        </span>
    </div>
  );
}

export default BlogAsideNewsletter;
