import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import { clx } from "$store/sdk/clx.ts";

export interface SocialItem {
  label:
    | "Discord"
    | "Facebook"
    | "Instagram"
    | "Linkedin"
    | "Tiktok"
    | "Twitter"
    | "Youtube"
    | "Email";
  link: string;
}

export default function Social(
  { content, vertical = false }: {
    content?: { title?: string; items?: SocialItem[] };
    vertical?: boolean;
  },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col gap-4">
          {content.title && (
            <h3 class="text-24 uppercase text-base-150 mt-[10px] font-black">
              {content.title}
            </h3>
          )}
          <ul
            class={clx(
              `grid grid-cols-6-auto md:gap-4 mobile:gap-x-[10px] mobile:gap-y-[16px] ${
                vertical
                  ? "lg:flex-col lg:items-start"
                  : "flex-wrap items-center"
              }`,
            )}
          >
            {content.items.map((item) => {
              if (item.label === "Email") {
                return (
                  <li
                    class={`n1-footer__social relative mobile:order-first mobile:col-span-6 xl:ml-[60px] ${item.label}`}
                  >
                    <a
                      href={"mailto:" + item.link}
                      rel="noopener noreferrer"
                      aria-label={`${item.label} Logo`}
                      class="flex gap-2 items-center"
                    >
                      <span class="block p-1 rounded-full n1-footer__bg-social">
                        <Icon size={40} id={item.label} />
                      </span>
                      <span class="text-14 font-noto-sans font-normal text-base-150 tracking-[0.98px]">
                        {item.link}
                      </span>
                      {vertical && (
                        <div class="text-sm hidden lg:block">{item.label}</div>
                      )}
                    </a>
                  </li>
                );
              } else {
                return (
                  <li class={`n1-footer__social relative ${item.label}`}>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${item.label} Logo`}
                      class="flex gap-2 items-center"
                    >
                      <span class="block p-1 rounded-full n1-footer__bg-social">
                        <Icon size={40} id={item.label} />
                      </span>
                      {vertical && (
                        <div class="text-sm hidden lg:block">{item.label}</div>
                      )}
                    </a>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      )}
    </>
  );
}
