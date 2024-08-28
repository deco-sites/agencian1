import type { ImageWidget } from "apps/admin/widgets.ts";
import LabelForm from "$store/components/ui/LabelForm.tsx";
import ModalForm from "$store/components/ui/ModalForm.tsx";
import { clx } from "$store/sdk/clx.ts";
import type { JSX } from "preact";
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/compat";

/**@titleBy alt*/
interface Image {
  /**@title Imagem*/
  src?: ImageWidget;
  /**@title Largura da Imagem*/
  width?: number;
  /**@title Altura da Imagem*/
  height?: number;
  /**@title Nome da Imagem*/
  alt?: string;
}

interface Device {
  desktop?: Image;
  mobile?: Image;
}

interface Text {
  /**@title Título */
  /**@format rich-text */
  title?: string;
  /**@title Texto */
  /**@format rich-text */
  description?: string;
}

/**@titleBy title */
interface fieldsForm {
  /**@title Título */
  title?: string;
  /**@title Subtítulo */
  subtitle?: string;

  ads?: boolean;

  /**@description Tamanho de fonte dos campos */
  fontSize?: "normal" | "base" | "large";

  /**
   * @title Campo 01
   * @description comercial
   */
  commercial?: string;
  /**
   * @title Campo 02
   * @description Parceria
   */
  partnership?: string;
  /**
   * @title Campo 03
   * @description Outros
   */
  others?: string;
  /**
   * @title Campo 04
   * @description Nome
   */
  name_user?: string;
  /**@title Digite o texto da máscara */
  placeholderName_user?: string;
  /**
   * @title Campo 05
   * @description Nome da Empresa
   */
  name_company?: string;
  /**@title Digite o texto da máscara */
  placeholderName_company?: string;
  /**
   * @title Campo 06
   * @description Telefone
   */
  phone_number?: string;
  /**
   * @title Campo 07
   * @description E-mail
   */
  email?: string;
  /**@title Digite o texto da máscara */
  placeholderEmail?: string;
  /**
   * @title Campo 08
   * @description Mensagem
   */
  message?: string;
  /**@title Digite o texto da máscara */
  placeholderMessage?: string;

  /** @description Estilo do botão */
  buttonStyle?: "normal" | "ads";

  /**@title Texto do botão*/
  textButton?: string;
}

interface Props {
  /**@title Imagem */
  image?: Device;
  /**@title Textos */
  text?: Text;
  /**@title Habilitar Modal para alteração */
  activeModalForm?: "Sim" | "Não";
  /**@title Dados do formulário */
  fieldsForm?: fieldsForm;
}

const ACTIVEMODALFORM = {
  "Sim": true,
  "Não": false,
};

const variant = {
  normal: "bg-base-200 duration-200  text-[#585858] hover:bg-[#ffffff]",
  ads: "bg-accent duration-200 hover:bg-[#F8BC33] text-primary",
};

const size = {
  normal: "text-14",
  base: "text-16",
  large: "text-24",
};

function ContactForm(
  { image, text, activeModalForm = "Não", fieldsForm }: Props,
) {
  const displayModalForm = useSignal(ACTIVEMODALFORM[activeModalForm]);

  useEffect(() => {
    const btnSubmits = document.querySelectorAll<HTMLButtonElement>(
      ".n1-form__submit",
    );
    btnSubmits.forEach((btnSubmit) => {
      btnSubmit.removeAttribute("disabled");
    });
  }, []);

  function addMaskofTelephone(target: HTMLInputElement) {
    let mask = target.value;
    // Remove qualquer caractere que não seja número
    mask = mask.replace(/\D/g, "");

    // Add máscara
    switch (mask.length) {
      case 1:
        mask = mask.replace(/^(\d{1})$/, "($1");
        break;
      case 2:
        mask = mask.replace(/^(\d{2})$/, "($1)");
        break;
      case 3:
        mask = mask.replace(/^(\d{2})(\d{1})$/, "($1) $2");
        break;
      case 4:
        mask = mask.replace(/^(\d{2})(\d{2})$/, "($1) $2");
        break;
      case 5:
        mask = mask.replace(/^(\d{2})(\d{3})$/, "($1) $2");
        break;
      case 6:
        mask = mask.replace(/^(\d{2})(\d{4})$/, "($1) $2");
        break;
      case 7:
        mask = mask.replace(/^(\d{2})(\d{5})$/, "($1) $2-");
        break;
      case 8:
        mask = mask.replace(/^(\d{2})(\d{5})(\d{1})$/, "($1) $2-$3");
        break;
      case 9:
        mask = mask.replace(/^(\d{2})(\d{5})(\d{2})$/, "($1) $2-$3");
        break;
      case 10:
        mask = mask.replace(/^(\d{2})(\d{5})(\d{3})$/, "($1) $2-$3");
        break;
      case 11:
        mask = mask.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
        break;
    }
    // Atualiza o valor do campo de entrada com a máscara aplicada
    if (target && target?.value) return target.value = mask;
  }

  function snippetValidationField(field: HTMLElement, inputError: Element) {
    if (
      field &&
      (field instanceof HTMLInputElement ||
        field instanceof HTMLTextAreaElement)
    ) {
      if (field?.value === "") {
        field.type !== "radio" && field?.classList.add("is-active");
        field.type !== "radio" && inputError?.classList.remove("hidden");
        return null;
      } else if (
        field && field?.getAttribute("id") === "phone_number" &&
        field?.value.length < 15
      ) {
        field.type !== "radio" && field?.classList.add("is-active");
        field.type !== "radio" && inputError?.classList.remove("hidden");
        return null;
      } else {
        field.type !== "radio" && field?.classList.remove("is-active");
        field.type !== "radio" && inputError?.classList.add("hidden");

        const nameField = field.getAttribute("id");
        let valueField;

        if (field?.value !== "") {
          if (
            field && field.type === "radio" &&
            field instanceof HTMLInputElement
          ) {
            valueField = field.checked;
          } else {
            valueField = field.value;
          }
          return [nameField, valueField];
        }
      }
    }
  }

  function snippetValidateRadio(target: EventTarget) {
    if (target && target instanceof HTMLInputElement) {
      const elementFatherofInput = target.closest("ul");
      const allInputTypeData = elementFatherofInput &&
        elementFatherofInput.querySelectorAll<HTMLInputElement>("input");
      const spanErrorToRadio = elementFatherofInput &&
        elementFatherofInput.closest("div")?.querySelector("ul ~ span");

      allInputTypeData && allInputTypeData.length > 0 &&
        Array.from(allInputTypeData).map((input) => {
          input.classList.remove("add-border");
        });

      spanErrorToRadio?.classList.add("hidden");
    }
  }

  function validateAllField(target: HTMLFormElement) {
    if (!target) return;

    const spanErrorToRadio = target?.querySelector("ul ~ span");
    const allInputTypeData = target?.querySelectorAll("ul li input");
    const temp: Array<unknown> = [];
    const Allfields = target?.querySelectorAll<HTMLElement>("input, textarea");

    if (Allfields && Allfields.length > 0) {
      Array.from(Allfields).map((field) => {
        const inputError = field?.nextElementSibling;
        if (inputError) {
          temp.push(snippetValidationField(field, inputError));
        }
      });
    } else {
      return false;
    }

    // colocado em assign para copiar as propriedades de retorno de 1 ou + objetos
    // isso foi feito para poder add o data no fromEntries.
    // obs: fromEntries recebe obrigatoriamente 2 paramentros para iteração
    const data = Object.assign(temp.filter((n) => n));
    const json = Object.fromEntries(data);
    let fieldsRequired = false;

    if (
      json["name_user"] && json["phone_number"] && json["email"] &&
      json["message"]
    ) {
      fieldsRequired = true;
    }

    if (
      !json["commercial"] && !json["others"] && !json["partnership"]
    ) {
      spanErrorToRadio?.classList.remove("hidden");
      allInputTypeData && allInputTypeData?.length > 0 &&
        Array.from(allInputTypeData).map((input) => {
          input.classList.add("add-border");
        });

      return false;
    }

    if (fieldsRequired) {
      return Object.fromEntries(data);
    } else {
      return false;
    }
  }

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const { target } = e;

    if (!target) return;

    if (target && target instanceof HTMLFormElement) {
      const isValid = validateAllField(target);
      const modal = document.querySelector<HTMLElement>(".n1-modal-form__bg");

      if (isValid) {
        try {
          displayModalForm.value = true;
          modal && modal?.classList.add("is-active");

          const response = await fetch("/api/contactform", {
            method: "POST",
            body: JSON.stringify(isValid),
            headers: {
              "content-type": "application/json",
              "accept": "application/json",
            },
          });

          if (!response.ok) return;
        } finally {
          document.body.style.overflow = "hidden";

          const form = document.querySelector<HTMLFormElement>(
            "form.n1-contact__form",
          );
          const element = document.querySelector<HTMLElement>(".n1-modal-form");

          if (element) {
            element.classList.contains("hidden") &&
              element.classList.remove("hidden");
          }

          displayModalForm.value = true;

          setTimeout(() => {
            displayModalForm.value = false;
            document.body.style.overflow = "visible";
            modal && modal?.classList.remove("is-active");

            form && Array.from(form).forEach((item) => {
              if (
                item && item.getAttribute("type") !== "radio" &&
                (item instanceof HTMLInputElement ||
                  item instanceof HTMLTextAreaElement)
              ) {
                item.value = "";
              }

              if (
                item.getAttribute("type") === "radio" &&
                item instanceof HTMLInputElement
              ) {
                item.checked = false;
              }
            });

            if (element) {
              element.classList.contains("hidden") &&
                element.classList.add("hidden");
            }
          }, 2000);
        }
      }
    }
  };

  function handleKeyUp(e: KeyboardEvent) {
    const { target } = e;
    if (!target) return;
    if (target && target instanceof HTMLInputElement) {
      addMaskofTelephone(target);
    }
  }

  function handleChange(e: Event) {
    const { target } = e;

    if (!target) return;

    if (e.type === "click") {
      snippetValidateRadio(target);
      return;
    }

    if (
      target &&
      (target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement)
    ) {
      const inputField = target;
      const inputError = inputField?.nextElementSibling;

      inputError && snippetValidationField(inputField, inputError);
    }
  }

  function handleOnBlur(e: Event) {
    const { target } = e;
    if (!target) return;
    if (
      target &&
      (target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement)
    ) {
      const inputField = target;
      const inputError = inputField?.nextElementSibling;

      inputError && snippetValidationField(inputField, inputError);
    }
  }

  return (
    <>
      <div class="md:n1-container md:px-[120px] !pb-5 mobile:px-[20px]">
        <div class="flex flex-col">
          <div class="flex flex-col">
            <form
              class="n1-contact__form text-sm flex flex-col gap-4"
              onSubmit={handleSubmit}
            >
              {/* TIPO DE CONTATO __________________________________________________________________________| INICIAL | */}
              <div class="flex flex-col">
                {fieldsForm?.title && (
                  <h3 class="text-24 font-black font-archimoto-medium text-[#ffffff]">
                    {fieldsForm.title}
                  </h3>
                )}

                <div>
                  <ul class="flex gap-4 mb-2.5">
                    {/* Comercial*/}
                    {fieldsForm?.commercial && (
                      <li class="flex flex-row gap-[8px] lg:flex-row items-center">
                        <input
                          onClick={handleChange}
                          name={"type-contact"}
                          type={"radio"}
                          id={"commercial"}
                          class={clx(
                            `n1-input--radio-error n1-radio-custom checked:is-active relative appearance-none rounded-[10px] 
                            bg-transparent w-[32px] h-[32px] border-2 border-[#F3F4F7] outline-none`,
                          )}
                        />
                        <LabelForm
                          _class={`${displayModalForm.value} teste-n1 font-normal text-[#ffffff] text-14 leading-[21px] font-noto-sans`}
                          nameAttr={"commercial"}
                        >
                          {fieldsForm.commercial}
                        </LabelForm>
                      </li>
                    )}

                    {fieldsForm?.ads && (
                      <li class="flex-row hidden gap-[8px] lg:flex-row items-center">
                        <input
                          onClick={handleChange}
                          checked
                          name={"type-contact"}
                          type={"radio"}
                          id={"commercial"}
                          class={clx(
                            `n1-input--radio-error n1-radio-custom checked:is-active relative appearance-none rounded-[10px] 
                           bg-transparent w-[32px] h-[32px] border-2 border-[#F3F4F7] outline-none`,
                          )}
                        />
                        <LabelForm
                          _class={`${displayModalForm.value} teste-n1 font-normal text-[#ffffff] text-14 leading-[21px] font-noto-sans`}
                          nameAttr={"commercial"}
                        >
                        </LabelForm>
                      </li>
                    )}
                    {/* Parceria*/}
                    {fieldsForm?.partnership && (
                      <li class="flex flex-row gap-[8px] lg:flex-row items-center">
                        <input
                          onClick={handleChange}
                          name={"type-contact"}
                          type={"radio"}
                          id={"partnership"}
                          class={clx(
                            `n1-input--radio-error n1-radio-custom checked:is-active relative appearance-none rounded-[10px] 
                            bg-transparent w-[32px] h-[32px] border-2 border-[#F3F4F7] outline-none`,
                          )}
                        />
                        <LabelForm
                          _class={`font-normal text-[#ffffff] text-14 leading-[21px] font-noto-sans`}
                          nameAttr={"partnership"}
                        >
                          {fieldsForm?.partnership}
                        </LabelForm>
                      </li>
                    )}
                    {/* Outros*/}
                    {fieldsForm?.others && (
                      <li class="flex flex-row gap-[8px] lg:flex-row items-center">
                        <input
                          onClick={handleChange}
                          name={"type-contact"}
                          type={"radio"}
                          id={"others"}
                          class={clx(
                            `n1-input--radio-error n1-radio-custom checked:is-active relative appearance-none rounded-[10px] 
                            bg-transparent w-[32px] h-[32px] border-2 border-[#F3F4F7] outline-none`,
                          )}
                        />
                        <LabelForm
                          _class={`font-normal text-[#ffffff] text-14 leading-[21px] font-noto-sans`}
                          nameAttr={"others"}
                        >
                          {fieldsForm.others}
                        </LabelForm>
                      </li>
                    )}
                  </ul>
                  <span class="hidden text-error text-[12px] leading-[15.6px]">
                    Selecione um dos campos acima
                  </span>
                </div>
              </div>
              {/* TIPO DE CONTATO __________________________________________________________________________| FINAL | */}

              {fieldsForm?.subtitle && (
                <h3 class="text-24 font-black font-archimoto-medium text-[#ffffff]">
                  {fieldsForm.subtitle}
                </h3>
              )}
              {/* DADOS __________________________________________________________________________________| INICIAL | */}
              <div class="flex flex-col gap-4 lg:flex-row">
                {/* Nome*/}
                {fieldsForm?.name_user && (
                  <div class="form-control flex-col gap-[10px] w-full">
                    <LabelForm
                      _class={`font-bold text-[#ffffff]  ${
                        size[fieldsForm.fontSize ?? "normal"]
                      }  leading-[21px] font-archimoto-medium`}
                      nameAttr={"name_user"}
                    >
                      {fieldsForm.name_user}
                    </LabelForm>
                    <input
                      onChange={handleChange}
                      onBlur={handleOnBlur}
                      placeholder={fieldsForm?.placeholderName_user}
                      name={"name_user"}
                      id={"name_user"}
                      type={"text"}
                      class={clx(
                        `n1-input--error rounded-[24px] bg-transparent py-[12px] px-[20px] max-h-[42px] border border-[#F3F4F7] duration-300
                            font-medium text-[#ffffff] text-12 leading-[18px] font-noto-sans outline-none focus:border-[#646363]`,
                      )}
                    />
                    <span class="hidden text-error text-[12px] leading-[15.6px]">
                      Campo obrigatório
                    </span>
                  </div>
                )}
                {/* Nome da Empresa*/}
                {fieldsForm?.name_company && (
                  <div class="form-control gap-[10px] w-full">
                    <LabelForm
                      _class={`font-bold text-[#ffffff]   ${
                        size[fieldsForm.fontSize ?? "normal"]
                      }  leading-[21px] font-archimoto-medium `}
                      nameAttr="name_company"
                    >
                      {fieldsForm.name_company}
                    </LabelForm>
                    <input
                      placeholder={fieldsForm?.placeholderName_company}
                      name={"name_company"}
                      id={"name_company"}
                      type={"text"}
                      class={clx(
                        `rounded-[24px] bg-transparent py-[12px] px-[20px] max-h-[42px] border border-[#F3F4F7] duration-300
                            font-medium text-[#ffffff] text-12 leading-[18px] font-noto-sans outline-none focus:border-[#646363]`,
                      )}
                    />
                    <span class="hidden text-error text-[12px] leading-[15.6px]">
                    </span>
                  </div>
                )}
              </div>
              <div class="flex flex-col gap-4 lg:flex-row">
                {/* Telefone*/}
                {fieldsForm?.phone_number && (
                  <div class="form-control gap-[10px] w-full">
                    <LabelForm
                      _class={`font-bold text-[#ffffff]  ${
                        size[fieldsForm.fontSize ?? "normal"]
                      }  leading-[21px] font-archimoto-medium`}
                      nameAttr="phone_number"
                    >
                      {fieldsForm.phone_number}
                    </LabelForm>

                    <input
                      onKeyUp={handleKeyUp}
                      onChange={handleChange}
                      onBlur={handleOnBlur}
                      placeholder="(00) 00000-0000"
                      name="phone_number"
                      type="text"
                      // @ts-ignore: Ignorando erro
                      maxlength="15"
                      id="phone_number"
                      class={clx(
                        `n1-input--error w-full rounded-[24px] bg-transparent py-[12px] px-[20px] max-h-[42px] border border-[#F3F4F7] duration-300
                            font-medium text-[#ffffff] text-12 leading-[18px] font-noto-sans outline-none focus:border-[#646363]`,
                      )}
                    />

                    <span class="hidden text-error text-[12px] leading-[15.6px]">
                      Campo obrigatório
                    </span>
                  </div>
                )}
                {/* Email*/}
                {fieldsForm?.email && (
                  <div class="form-control gap-[10px] w-full">
                    <div class="form-control gap-[10px] w-full">
                      <LabelForm
                        _class={`font-bold text-[#ffffff]  ${
                          size[fieldsForm.fontSize ?? "normal"]
                        }  leading-[21px] font-archimoto-medium `}
                        nameAttr="email"
                      >
                        {fieldsForm.email}
                      </LabelForm>
                      <input
                        onChange={handleChange}
                        onBlur={handleOnBlur}
                        placeholder={fieldsForm?.placeholderEmail}
                        name="email"
                        id="email"
                        type="email"
                        class={clx(
                          `n1-input--error rounded-[24px] bg-transparent py-[12px] px-[20px] max-h-[42px] border border-[#F3F4F7] duration-300
                                font-medium text-[#ffffff] text-12 leading-[18px] font-noto-sans outline-none focus:border-[#646363]`,
                        )}
                      />
                      <span class="hidden text-error text-[12px] leading-[15.6px]">
                        Campo obrigatório
                      </span>
                    </div>
                  </div>
                )}
              </div>
              {/* Mensagem*/}
              {fieldsForm?.message && (
                <div class="form-control gap-4">
                  <label
                    class={` ${
                      size[fieldsForm.fontSize ?? "normal"]
                    } font-bold text-[#ffffff]  leading-[21px] font-archimoto-medium`}
                    for="message"
                  >
                    {fieldsForm.message}
                  </label>
                  <textarea
                    onChange={handleChange}
                    onBlur={handleOnBlur}
                    placeholder={fieldsForm?.placeholderMessage}
                    name="message"
                    id="message"
                    type="text"
                    class={clx(
                      `n1-input--error bg-transparent rounded-[38px] h-[90px] border border-[#F3F4F7] py-[20px] px-[40px] duration-300
                        font-medium text-[#ffffff] text-12 leading-[18px] font-noto-sans outline-none focus:border-[#646363]`,
                    )}
                  />
                  <span class="hidden -mt-[20px] text-error text-[12px] leading-[15.6px]">
                    Campo obrigatório
                  </span>
                </div>
              )}
              {/* DADOS __________________________________________________________________________________| FINAL | */}

              {fieldsForm?.textButton && (
                <div>
                  <button
                    type="submit"
                    disabled
                    class={clx(
                      `${
                        variant[fieldsForm.buttonStyle ?? "ads"]
                      } n1-form__submit disabled:opacity-50 py-[20px] px-[30px]  rounded-[100px] 
                      max-h-[52px] !leading-none text-16 font-archimoto-medium font-black`,
                    )}
                  >
                    {fieldsForm.textButton}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* { displayModalForm.value && ( */}
      <div
        class={`n1-modal-form__bg ${displayModalForm.value ? "is-active" : ""}`}
      >
        <ModalForm image={image} text={text} />
      </div>
      {/* )} */}
    </>
  );
}

export default ContactForm;
