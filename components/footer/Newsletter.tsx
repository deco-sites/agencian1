import { useSignal } from "@preact/signals";
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
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      await invoke.vtex.actions.newsletter.subscribe({ email });
    } finally {
      loading.value = false;
    }
  };

  return (
    <div
      class={clx(`flex -order-1 ${tiled
          ? "flex-col lg:flex-row lg:w-full lg:justify-between"
          : "flex-col"}`)}>
      <div class="flex flex-col">
        {content?.title && (
          <h4 class={clx(`mobile:max-w-[100%] max-w-[90%] mobile:text-32 md:text-48 mobile:mt-[50px]
          text-base-150 font-black font-archimoto-medium ${tiled} ? "text-2xl lg:text-3xl" : "text-lg"`)}>
            {content?.title}
          </h4>
        )}
        {content?.description &&
          <div class={clx(`pt-[10px] pb-[24px] md:pb-[30px] max-w-[90%] mobile:max-w-[100%] xl:max-w-[80%] 
            font-noto-sans-thin mobile:text-14 md:text-16 text-base-150 md:leading-[25.6px]`)}>{content?.description}</div>
          }
      </div>
      <div class="flex flex-col">
        <form
          class="form-control"
          onSubmit={handleSubmit}
        >
          <div class="flex flex-wrap gap-[18px]">
            <input
              name="email"
              class="bg-[#ffffff] flex-auto md:flex-none input input-bordered md:w-[273px] bg-white text-base-content font-noto-sans-thin rounded-[90px] text-14 n1-text-base-400"
              placeholder={content?.form?.placeholder || "Digite seu email"}
            />
            <button
              type="submit"
              class="btn disabled:loading w-[144px] md:w-[123px] border-0 bg-accent n1-btn-header-item--rounded text-16 font-archimoto-medium pt-[3px] uppercase"
              disabled={loading}
            >
              {content?.form?.buttonText || "Inscrever"}
            </button>
          </div>
        </form>
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
