import Icon from "$store/components/ui/Icon.tsx";
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
  link?: string;
  disabledSocial?: boolean;
}

function SocialIcon({ label }: { label: SocialItem["label"] }) {
  return (
    <span class="size-[40px] flex items-center justify-center">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="20"
          cy="20"
          r="19.25"
          stroke="url(#paint0_linear_17397_1024)"
          stroke-width="1.5"
        />
        <defs>
          <linearGradient
            id="paint0_linear_17397_1024"
            x1="29.5"
            y1="-16.9761"
            x2="20"
            y2="90.5239"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="0.568606" stop-color="#3CCBDA" />
          </linearGradient>
        </defs>
      </svg>
      <Icon
        size={17}
        id={label}
        class="text-[#FFF] absolute lg:ml-[1px] lg:mb-[1px]"
      />
    </span>
  );
}

function SocialLink(
  { item, vertical }: { item: SocialItem; vertical: boolean },
) {
  const isEmail = item.label === "Email";
  const href = isEmail
    ? item.link ? `mailto:${item.link}` : "#"
    : item.link || "#";

  return (
    <a
      href={href}
      target={isEmail ? undefined : "_blank"}
      rel="noopener noreferrer"
      aria-label={`${item.label} Logo`}
      class="flex gap-2 items-center"
    >
      <SocialIcon label={item.label} />
      {isEmail && (
        <span class="text-14 font-noto-sans font-bold text-base-150 tracking-[0.98px]">
          {item.link}
        </span>
      )}
      {vertical && <div class="text-sm hidden lg:block">{item.label}</div>}
    </a>
  );
}

export default function Social({
  content,
  vertical = false,
}: {
  content?: { title?: string; items?: SocialItem[] };
  vertical?: boolean;
}) {
  if (!content?.items?.length) return null;

  return (
    <div class="flex flex-col gap-4">
      {content.title && (
        <h3 class="text-24 uppercase text-base-150 mt-[10px] font-black">
          {content.title}
        </h3>
      )}
      <ul
        class={clx(
          `grid grid-cols-[repeat(6,40px)] gap-4 w-full ${
            vertical ? "lg:flex-col lg:items-start" : "flex-wrap items-center"
          }`,
        )}
      >
        {content.items.map((item) => {
          if (item?.disabledSocial) return null;

          return (
            <li
              class={`n1-footer__social relative w-fit ${
                item.label === "Email"
                  ? "mobile:order-first mobile:col-span-6 xl:ml-[60px]"
                  : ""
              } ${item.label}`}
            >
              <SocialLink item={item} vertical={vertical} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
