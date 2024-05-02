import LinkWithOptionArrow from "$store/components/ui/LinkWithOptionArrow.tsx";
import { clx } from "$store/sdk/clx.ts";

interface Props {
  subtitle?: string;
  text?: string;
  textButton?: string;
  hrefButton?: string;
  activeArrow?: boolean;
  addBar?: boolean;
  addKeysInWords?: boolean;
}

function CasesComponentTextWithButton(
  {
    subtitle,
    text,
    textButton,
    hrefButton,
    activeArrow,
    addBar,
    addKeysInWords,
  }: Props,
) {
  return (
    <>
      <div class="mobile:my-[24px] text-[#ffffff] flex items-center justify-between">
        <div>
          {subtitle && (
            <div
              class={clx(
                `n1-cases-component__title font-archimoto-medium mobile:[&_*]:!text-24 leading-[28.8px] md:text-56 md:leading-[20px]
              ${
                  addKeysInWords
                    ? "is-keys-custom"
                    : addBar
                    ? "is-bar-custom"
                    : ""
                }`,
              )}
              dangerouslySetInnerHTML={{ __html: subtitle }}
            >
            </div>
          )}
          {text && (
            <span class="hidden md:flex font-noto-sans text-20 leading-[26px]">
              {text}
            </span>
          )}
        </div>
      </div>

      {textButton && (
        <div
          class={clx(
            `mobile:order-3 mobile:justify-start col-[2] flex items-center justify-end md:w-[90%] my-0 md:mx-auto`,
          )}
        >
          <LinkWithOptionArrow
            text={textButton}
            link={hrefButton}
            activeArrow={activeArrow}
            width={"236"}
            fontSize="16"
            margin={"0"}
          />
        </div>
      )}
    </>
  );
}

export default CasesComponentTextWithButton;
