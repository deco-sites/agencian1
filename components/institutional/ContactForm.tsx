import type { ImageWidget } from "apps/admin/widgets.ts";
import Button from "$store/components/ui/Button.tsx";
import LabelForm from "$store/components/ui/LabelForm.tsx";
// import InputForm from "$store/components/ui/InputForm.tsx";
import ModalForm from "$store/components/ui/ModalForm.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { clx } from "$store/sdk/clx.ts";

/**@titleBy alt*/ 
interface Image{
  /**@title Imagem*/    
  src?:ImageWidget;
  /**@title Largura da Imagem*/    
  width?:number;
  /**@title Altura da Imagem*/    
  height?:number;
  /**@title Nome da Imagem*/    
  alt?:string;
}

interface Device{
  desktop?:Image;
  mobile?:Image;
}

interface Text{
  /**@title Título */    
  /**@format html */          
  title?:string;
  /**@title Texto */      
  /**@format html */      
  description?:string;
}

interface Props{
  /**@title Imagem */       
  image?:Device;
  /**@title Textos */       
  text?:Text;
  /**@title Habilitar Modal para alteração */   
  activeModalForm?: "Sim" | "Não";
}

const ACTIVEMODALFORM = {
  "Sim" : true,
  "Não" : false
}

function ContactForm( { image, text, activeModalForm }:Props ) {
  const { displayModalForm } = useUI();

  if(activeModalForm) displayModalForm.value = ACTIVEMODALFORM[activeModalForm] 

  function addMaskofTelephone( target: HTMLInputElement ){
    let mask = target.value;        
    // Remove qualquer caractere que não seja número
    mask = mask.replace(/\D/g, '');

    // Add máscara
    switch (mask.length) {
      case 1: mask = mask.replace(/^(\d{1})$/, '($1'); break;
      case 2: mask = mask.replace(/^(\d{2})$/, '($1)');break;
      case 3: mask = mask.replace(/^(\d{2})(\d{1})$/, '($1) $2');break;
      case 4: mask = mask.replace(/^(\d{2})(\d{2})$/, '($1) $2');break;
      case 5: mask = mask.replace(/^(\d{2})(\d{3})$/, '($1) $2');break;
      case 6: mask = mask.replace(/^(\d{2})(\d{4})$/, '($1) $2');break;
      case 7: mask = mask.replace(/^(\d{2})(\d{5})$/, '($1) $2-');break;
      case 8: mask = mask.replace(/^(\d{2})(\d{5})(\d{1})$/, '($1) $2-$3');break;
      case 9: mask = mask.replace(/^(\d{2})(\d{5})(\d{2})$/, '($1) $2-$3');break;
      case 10:mask = mask.replace(/^(\d{2})(\d{5})(\d{3})$/, '($1) $2-$3');break;
      case 11:mask = mask.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');break;
    }
     // Atualiza o valor do campo de entrada com a máscara aplicada
     if( target && target?.value ) return target.value = mask;        
  }  

  function snippetValidationField(field:Element, inputError:Element){
    if( field && ( field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) ){
      if( field?.value === '' ){
        field?.classList.add('is-active');
        field?.classList.remove('hidden');
      } else if( field && field?.getAttribute('id') === 'phoneNumber' && field?.value.length < 15){
        field?.classList.add('is-active');
        inputError?.classList.remove('hidden');  
      } else {
        field?.classList.remove('is-active');
        inputError?.classList.add('hidden') ;         
      }
    }    
  }

  function validateAllField( target:HTMLFormElement ){    
    if (!target) return;     
    const Allfields = target?.querySelectorAll<HTMLElement>('input:not(#commercial, #partnership, #others, #nameCompany), textarea');

    Allfields && Allfields.length > 0 && Array.from(Allfields).map( (field) => {
      const inputError = field?.nextElementSibling;

      inputError && snippetValidationField(field,inputError);
    })
  }

  function handleSubmit( e: Event ){
    e.preventDefault();
    const { target } = e;
    if (!target) return;
    if (target && target instanceof HTMLFormElement) {
      // validar campos do formulário
      validateAllField( target );
    }
  }

  function handleKeyUp( e: KeyboardEvent ){
    const { target } = e;
    if (!target) return;
    if (target && target instanceof HTMLInputElement) {
      addMaskofTelephone( target )
    }
  }

  function handleChange( e: Event ){
    const { target } = e;
    if (!target) return;
    if (target && (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement )) {      
      const inputField = target;
      const inputError = inputField?.nextElementSibling; 
      
      inputError && snippetValidationField(inputField,inputError)      
    }
  }

  function handleOnBlur( e: Event ){
    const { target } = e;
    if (!target) return;
    if (target && (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) ) {
      const inputField = target;
      const inputError = inputField?.nextElementSibling;       

      inputError && snippetValidationField(inputField,inputError)  
    }
  }

  return (
    <>
      <div class="md:n1-container md:px-[120px] !mb-[80px] mobile:mt-[80px] mobile:px-[20px]">
        <div class="flex flex-col">        
          <div class="flex flex-col gap-[32px]">          
            <form class="text-sm flex flex-col gap-[32px]" onSubmit={handleSubmit}>

              {/* TIPO DE CONTATO __________________________________________________________________________| INICIAL | */}
              <div class="flex flex-col gap-[32px]">
                <h3 class="text-24 font-black font-archimoto-medium text-[#ffffff]">Tipo de Contato</h3>

                <ul class="flex gap-[30px]">
                  {/* Comercial*/}
                  <li class="flex flex-row gap-[8px] lg:flex-row items-center">
                    <input
                      name={"commercial"}
                      type={"checkbox"}
                      id={"commercial"}
                      class={clx(`n1-radio-custom checked:is-active relative appearance-none rounded-[10px] 
                      bg-transparent w-[32px] h-[32px] border-2 border-[#F3F4F7] outline-none`)}                                     
                    />                              
                    <LabelForm 
                      _class={`font-normal text-[#ffffff] text-14 leading-[21px] font-noto-sans`} 
                      nameAttr={'commercial'}> 
                      Comercial
                    </LabelForm>                    
                  </li>
                  {/* Parceria*/}
                  <li class="flex flex-row gap-[8px] lg:flex-row items-center">
                    <input
                      name={"partnership"}
                      type={"checkbox"}
                      id={"partnership"}
                      class={clx(`n1-radio-custom checked:is-active relative appearance-none rounded-[10px] 
                      bg-transparent w-[32px] h-[32px] border-2 border-[#F3F4F7] outline-none`)}                    
                    />                              
                    <LabelForm 
                      _class={`font-normal text-[#ffffff] text-14 leading-[21px] font-noto-sans`} 
                      nameAttr={'partnership'}> 
                      Parceria
                    </LabelForm>
                  </li> 
                  {/* Outros*/}
                  <li class="flex flex-row gap-[8px] lg:flex-row items-center">
                    <input
                      name={"others"}
                      type={"checkbox"}
                      id={"others"}
                      class={clx(`n1-radio-custom checked:is-active relative appearance-none rounded-[10px] 
                      bg-transparent w-[32px] h-[32px] border-2 border-[#F3F4F7] outline-none`)}                    
                    />                              
                    <LabelForm 
                      _class={`font-normal text-[#ffffff] text-14 leading-[21px] font-noto-sans`} 
                      nameAttr={'others'}> 
                      Outros
                    </LabelForm>
                  </li>                 
                </ul>
              </div>
              {/* TIPO DE CONTATO __________________________________________________________________________| FINAL | */}

              <h3 class="text-24 font-black font-archimoto-medium text-[#ffffff]">Dados</h3>
              {/* DADOS __________________________________________________________________________________| INICIAL | */}
              <div class="flex flex-col gap-[30px] lg:flex-row">
                  {/* Nome*/}
                  <div class="form-control flex-col gap-[10px] w-full">                  
                      <LabelForm 
                          _class={`font-bold text-[#ffffff] text-14 leading-[21px] font-noto-sans`} 
                          nameAttr={'nameUser'}> 
                          Nome
                      </LabelForm>
                      <input  
                        onChange={handleChange}
                        onBlur={handleOnBlur}
                        placeholder={"Seu nome"}
                        name={"nameUser"}
                        id={"nameUser"}
                        type={"text"}
                        class={clx(`n1-input--error rounded-[24px] bg-transparent py-[12px] px-[20px] max-h-[42px] border border-[#F3F4F7] duration-300
                          font-medium text-[#ffffff] text-12 leading-[18px] font-noto-sans outline-none focus:border-[#646363]`)}                    
                      />
                      <span class="hidden text-error text-[12px] leading-[15.6px]"> Campo obrigatório </span>
                  </div>
                  {/* Nome da Empresa*/}                
                  <div class="form-control gap-[10px] w-full">
                      <LabelForm 
                          _class="font-bold text-[#ffffff] text-14 leading-[21px] font-noto-sans" 
                          nameAttr="nameCompany">
                              Nome da Empresa
                      </LabelForm>
                      <input
                        placeholder="*Opcional"
                        name="nameCompany"
                        type="text"
                        id="nameCompany"
                        class={clx(`rounded-[24px] bg-transparent py-[12px] px-[20px] max-h-[42px] border border-[#F3F4F7] duration-300
                        font-medium text-[#ffffff] text-12 leading-[18px] font-noto-sans outline-none focus:border-[#646363]`)}
                      />
                  </div>
              </div>
              <div class="flex flex-col gap-[30px] lg:flex-row">
                  {/* Telefone*/}
                  <div class="form-control gap-[10px] w-full">
                      <LabelForm 
                          _class="font-bold text-[#ffffff] text-14 leading-[21px] font-noto-sans" 
                          nameAttr="phoneNumber">
                          Telefone
                      </LabelForm>
                      
                      <input  
                        onKeyUp={handleKeyUp}
                        onChange={handleChange}
                        onBlur={handleOnBlur}
                        placeholder="(00) 00000-0000"
                        name="phoneNumber"
                        type="text"
                        // @ts-ignore: Ignorando erro
                        maxlength="15"
                        id="phoneNumber"
                        class={clx(`n1-input--error w-full rounded-[24px] bg-transparent py-[12px] px-[20px] max-h-[42px] border border-[#F3F4F7] duration-300
                        font-medium text-[#ffffff] text-12 leading-[18px] font-noto-sans outline-none focus:border-[#646363]`)}
                      />

                      <span class="hidden text-error text-[12px] leading-[15.6px]"> Campo obrigatório </span>
                      
                  </div>
                  {/* Email*/}
                  <div class="form-control gap-[10px] w-full">
                      <div class="form-control gap-[10px] w-full">
                          <LabelForm 
                              _class="font-bold text-[#ffffff] text-14 leading-[21px] font-noto-sans" 
                              nameAttr="email">
                                  E-mail
                          </LabelForm>
                          <input  
                            onChange={handleChange}
                            onBlur={handleOnBlur}                          
                            placeholder="Seu melhor e-mail"
                            name="email"
                            id="email"
                            type="email"
                            class={clx(`n1-input--error rounded-[24px] bg-transparent py-[12px] px-[20px] max-h-[42px] border border-[#F3F4F7] duration-300
                            font-medium text-[#ffffff] text-12 leading-[18px] font-noto-sans outline-none focus:border-[#646363]`)}
                          />
                          <span class="hidden text-error text-[12px] leading-[15.6px]"> Campo obrigatório </span>
                      </div>
                  </div>
              </div>
              {/* Mensagem*/}
              <div class="form-control gap-[32px]">
                  <label class="font-bold text-[#ffffff] text-24 leading-[21px] font-archimoto-medium" for="message">Mensagem</label>
                  <textarea
                    onChange={handleChange}
                    onBlur={handleOnBlur}                  
                    placeholder="Sua mensagem aqui"
                    name="message"
                    id="message"
                    type="text"
                    class={clx(`n1-input--error bg-transparent rounded-[38px] h-[90px] border border-[#F3F4F7] py-[20px] px-[40px] duration-300
                      font-medium text-[#ffffff] text-12 leading-[18px] font-noto-sans outline-none focus:border-[#646363]`)}
                  />
                  <span class="hidden -mt-[20px] text-error text-[12px] leading-[15.6px]"> Campo obrigatório </span>
              </div>
              {/* DADOS __________________________________________________________________________________| FINAL | */}

              <div>
                <input
                  type="submit" 
                  class={clx(`py-[20px] px-[30px] bg-base-200 rounded-[100px] text-[#585858] hover:bg-[#ffff] 
                    max-h-[52px] !leading-none text-16 font-archimoto-medium font-black`)}
                    value="Enviar" 
                  />
              </div>
            </form>
          </div>
        </div>
      </div>
      { displayModalForm.value && (
        <div>
          <ModalForm image={image} text={text} />
        </div>
      )}
    </>
  );
}

export default ContactForm;
