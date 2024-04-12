import { clx } from "$store/sdk/clx.ts";

interface Props {
  text?: string;
  link?: string | undefined;
  activeArrow?: boolean;
  width?: string;
  customClass?: string;
  fontSize?: string;
  margin?: string;
  activeArrowBlue?: boolean;
  activeArrowService?: boolean;
}

function LinkWithOptionArrow(
  {
    text,
    link,
    activeArrow,
    width,
    customClass,
    fontSize,
    margin,
    activeArrowBlue,
    activeArrowService,
  }: Props,
) {
  return (
    <a
      href={`${link ? link : "javascript:void(0)"}`}
      style={{
        width: `${width ? width : "142"}px`,
        pointerEvents: `${link ? "all" : "none"}`,
      }}
      target="_blank"
      class={clx(`${
        width && !margin
          ? "mobile:my-0 mobile:mx-auto"
          : margin
          ? "ml-[0]"
          : "mobile:w-[130px]"
      } 
        ${
        activeArrowBlue
          ? "bg-[#ffffff]"
          : activeArrowService
          ? "bg-secondary border-transparent"
          : "bg-transparent border-[#ffffff]"
      } 
        n1-Link-with-option-arrow mobile:relative mobile:py-[7px] px-[10px] py-[10px] group flex items-center relative min-w-[125px]
        border text-16 uppercase n1-btn-header-item--rounded ${
        customClass ? customClass : ""
      }`)}
    >
      <span
        class={`${
          activeArrowBlue || activeArrowService
            ? "text-primary"
            : "text-[#ffffff]"
        } text-16 font-archimoto-medium pt-[3px] !mobile:mr-[25px] font-black`}
        style={{
          fontSize: `${fontSize ? fontSize + "px" : "16px"}`,
          marginRight: `${
            activeArrow || activeArrowBlue || activeArrowService ? "20px" : "0"
          }`,
        }}
      >
        {text ? text : ""}
      </span>

      {activeArrow && (
        <div class="rounded-[50%] p-[5px] mobile:right-[8px] absolute right-[10px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
          >
            <path
              fill="white"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.25 6.22656C5.25 5.81235 5.58579 5.47656 6 5.47656H12.75C13.1642 5.47656 13.5 5.81235 13.5 6.22656V12.9766C13.5 13.3908 13.1642 13.7266 12.75 13.7266C12.3358 13.7266 12 13.3908 12 12.9766V8.03722L5.78033 14.2569C5.48744 14.5498 5.01256 14.5498 4.71967 14.2569C4.42678 13.964 4.42678 13.4891 4.71967 13.1962L10.9393 6.97656H6C5.58579 6.97656 5.25 6.64078 5.25 6.22656Z"
            />
          </svg>
        </div>
      )}

      {activeArrowBlue && (
        <div class="p-[5px] mobile:right-[8px] absolute right-[5px]">
          <svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              class="not-circle"
              fill="#F3F4F7"
              d="M0.278564 11.273C0.278564 5.12786 5.26018 0.14624 11.4053 0.14624V0.14624C17.5505 0.14624 22.5321 5.12786 22.5321 11.273V11.273C22.5321 17.4181 17.5505 22.3998 11.4053 22.3998V22.3998C5.26018 22.3998 0.278564 17.4181 0.278564 11.273V11.273Z"
            />
            <path
              fill="#0C1F59"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.2646 8.1324C8.2646 7.78549 8.54582 7.50427 8.89272 7.50427H14.5458C14.8927 7.50427 15.174 7.78549 15.174 8.1324V13.7855C15.174 14.1324 14.8927 14.4136 14.5458 14.4136C14.1989 14.4136 13.9177 14.1324 13.9177 13.7855V9.64882L8.70875 14.8578C8.46345 15.1031 8.06575 15.1031 7.82045 14.8578C7.57515 14.6125 7.57515 14.2148 7.82045 13.9695L13.0294 8.76052H8.89272C8.54582 8.76052 8.2646 8.4793 8.2646 8.1324Z"
            />
          </svg>
        </div>
      )}

      {activeArrowService && (
        <div class="absolute right-[0px] top-[6px] mobile:top-[3px] mobile:right-[2px]">
          <svg
            fill="none"
            width="39"
            height="39"
            viewBox="0 0 39 39"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_15570_2809)">
              <path
                fill="#63D5E1"
                d="M4.5 15.5c0-8.284 6.716-15 15-15 8.284 0 15 6.716 15 15 0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15z"
                shape-rendering="crispEdges"
              />
              <path
                fill="#0C1F59"
                fill-rule="evenodd"
                d="M15.333 11.333c0-.46.373-.833.834-.833h7.5c.46 0 .833.373.833.833v7.5a.833.833 0 11-1.667 0v-5.488l-6.91 6.91a.833.833 0 11-1.179-1.178l6.91-6.91h-5.487a.833.833 0 01-.834-.834z"
                clip-rule="evenodd"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_15570_2809"
                width="38"
                height="38"
                x=".5"
                y=".5"
                color-interpolation-filters="sRGB"
                filterUnits="userSpaceOnUse"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  result="hardAlpha"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_15570_2809"
                />
                <feBlend
                  in="SourceGraphic"
                  in2="effect1_dropShadow_15570_2809"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
      )}
    </a>
  );
}

export default LinkWithOptionArrow;
