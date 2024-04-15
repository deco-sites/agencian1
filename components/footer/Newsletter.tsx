import { invoke } from "$store/runtime.ts";
import type { JSX } from "preact";
import { clx } from "$store/sdk/clx.ts";

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  content: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: Form;
  };
  layout?: {
    tiled?: boolean;
  };
}

function Newsletter(
  { content, layout = {} }: Props,
) {
  const { tiled = false } = layout;

  function validateEmail(target: HTMLElement, typeEvent?: string) {
    if (!target) return;

    let field;

    if (typeEvent === "submit") {
      field = target?.querySelector<HTMLInputElement>(".n1-input--error");
    } else {
      field = target;
    }

    const inputError = field && field?.nextElementSibling;

    if (field && field instanceof HTMLInputElement) {
      if (field?.value === "") {
        field?.classList.add("is-active");
        inputError?.classList.remove("hidden");

        return null;
      } else {
        field?.classList.remove("is-active");
        inputError?.classList.add("hidden");

        return field.value;
      }
    }
  }

  function handleOnChange(e: Event) {
    const { target } = e;
    if (!target) return;
    if (target && target instanceof HTMLInputElement) {
      const inputField = target;

      inputField && validateEmail(inputField);
    }
  }

  function handleOnBlur(e: Event) {
    const { target } = e;
    if (!target) return;
    if (target && target instanceof HTMLInputElement) {
      const inputField = target;

      inputField && validateEmail(inputField);
    }
  }

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const { target } = e;
    const typeEvent = e.type;

    if (!target) return;

    if (target && target instanceof HTMLElement) {
      const email = validateEmail(target, typeEvent);
      const news = target.closest(".news");
      const inputElement = news?.querySelector<HTMLInputElement>("input");
      const loadingElement = news?.querySelector<HTMLElement>(".is-loading");
      const message = news?.querySelector<HTMLElement>(".is-sucess");

      if (email) {
        try {
          loadingElement?.classList.remove("hidden");

          const response = await fetch("/api/newsletterform", {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: {
              "content-type": "application/json",
              "accept": "application/json",
            },
          });
        } catch (err) {
          loadingElement?.classList.add("hidden");
          console.log("error: ", err.message);
        } finally {
          if (inputElement instanceof HTMLInputElement) inputElement.value = "";
          target?.classList.add("hidden");
          loadingElement?.classList.add("hidden");
          message?.classList.remove("hidden");

          setTimeout(() => {
            target.classList.remove("hidden");
            message?.classList.add("hidden");
          }, 5000);
        }
      }
    }
  };

  return (
    <div
      class={clx(
        `flex -order-1 ${
          tiled
            ? "flex-col lg:flex-row lg:w-full lg:justify-between"
            : "flex-col"
        }`,
      )}
    >
      <div class="flex flex-col">
        {content?.title && (
          <h4
            class={clx(
              `mobile:max-w-[100%] max-w-[90%] mobile:text-32 md:text-48 mobile:mt-[50px]
            text-base-150 font-black font-archimoto-medium ${tiled} ? "text-2xl lg:text-3xl" : "text-lg"`,
            )}
          >
            {content?.title}
          </h4>
        )}
        {content?.description &&
          (
            <div
              class={clx(
                `pt-[10px] pb-[24px] md:pb-[30px] max-w-[90%] mobile:max-w-[100%] xl:max-w-[80%] 
            font-noto-sans mobile:text-14 md:text-16 text-base-150 md:leading-[25.6px]`,
              )}
            >
              {content?.description}
            </div>
          )}
      </div>
      <div class="flex flex-col relative news">
        <form
          class="form-control"
          onSubmit={handleSubmit}
        >
          <div class="grid grid-cols-2-auto gap-[18px] gap-y-[10px]">
            <input
              onBlur={handleOnBlur}
              onChange={handleOnChange}
              id="email"
              name="email"
              type="email"
              class={clx(
                `n1-input--error bg-[#ffffff] flex-auto md:flex-none input input-bordered md:w-[273px] bg-white text-base-content font-noto-sans 
                rounded-[90px] text-14 n1-text-base-400`,
              )}
              placeholder={content?.form?.placeholder || "Digite seu email"}
            />
            <span class="row-[2] hidden text-error text-[12px] leading-[15.6px]">
              Insira um e-mail válido
            </span>
            <button
              type="submit"
              class={clx(
                `btn disabled:loading w-[144px] md:w-[123px] border-0 bg-accent n1-btn-header-item--rounded 
                text-16 font-archimoto-medium pt-[3px] uppercase hover:bg-[#F8BC33] duration-300`,
              )}
            >
              {content?.form?.buttonText || "Inscrever"}
            </button>
          </div>
        </form>
        <div class="hidden is-loading"></div>
        <span class="is-sucess hidden font-noto-sans text-secondary mobile:text-14 md:text-16">
          E-mail enviado com sucesso!
        </span>
        {content?.form?.helpText && (
          <div
            class="text-sm"
            dangerouslySetInnerHTML={{ __html: content?.form?.helpText }}
          />
        )}
      </div>
    </div>
  );
}

export default Newsletter;
