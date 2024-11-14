import { clx } from "$store/sdk/clx.ts";

interface AsideNewsletter {
  titleNewsletter?: string;
  maskNewsletterName?: string;
  maskNewsletterEmail?: string;
  textButton?: string;
}

interface Props {
  newsletter?: AsideNewsletter;
}

function BlogAsideNewsletter({ newsletter }: Props) {
  return (
    <>
      <form
        class={clx(`flex flex-col gap-y-[20px]`)}
      >
        {newsletter?.titleNewsletter && (
          <div
            name="email"
            htmlFor="email"
            class={clx(
              `[&_*]:text-24 [&_*]:font-archimoto-medium [&_*]:font-black`,
            )}
            dangerouslySetInnerHTML={{ __html: newsletter.titleNewsletter }}
          >
          </div>
        )}
        {newsletter?.maskNewsletterName && (
          <input
            id="email"
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
                                mt-[10px] py-[15px] px-[20px] rounded-[100px] bg-accent text-primary flex items-center
                                text-[14px] leading-[14px] font-archimoto-medium font-black max-h-[40px]
                            `)}
            >
              {newsletter?.textButton}
            </button>
          </div>
        )}
      </form>
    </>
  );
}

export default BlogAsideNewsletter;