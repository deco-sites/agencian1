import Icon from "$store/components/ui/Icon.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Button from "$store/components/ui/Button.tsx";
import LabelForm from "$store/components/ui/LabelForm.tsx";
import InputForm from "$store/components/ui/InputForm.tsx";
import ModalForm from "$store/components/ui/ModalForm.tsx";
import { FnContext, SectionProps } from "deco/mod.ts";
import { useUI } from "$store/sdk/useUI.ts";


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

function ContactForm( props: SectionProps<ReturnType<typeof loader>> ) {
  const { image, text, activeModalForm, device } = props;
  const { displayModalForm } = useUI();

  if(activeModalForm) displayModalForm.value = ACTIVEMODALFORM[activeModalForm] 

  console.log('activeModalForm ---> ', activeModalForm)
  console.log('displayModalForm.value ---> ', displayModalForm.value)

  function handleChange( e: Event ){
    console.log('------------> ', e)
  }

  return (
    <>
      <div class="md:n1-container md:px-[120px] !mb-[80px] mobile:mt-[80px] mobile:px-[20px]">
        <div class="flex flex-col">        
          <div class="flex flex-col gap-[32px]">          
            <form class="text-sm flex flex-col gap-[32px]" >

              {/* TIPO DE CONTATO __________________________________________________________________________| INICIAL | */}
              <div class="flex flex-col gap-[32px]">
                <h3 class="text-24 font-black font-archimoto-medium text-[#ffffff]">Tipo de Contato</h3>

                <ul class="flex gap-[30px]">
                  {/* Comercial*/}
                  <li class="flex flex-row gap-[8px] lg:flex-row items-center">
                    <InputForm
                      nameAttr={"commercial"}
                      type={"checkbox"}
                      id={"commercial"}
                      _class={`n1-radio-custom checked:is-active relative appearance-none rounded-[10px] 
                      bg-transparent w-[32px] h-[32px] border-2 border-[#F3F4F7] outline-none`}                    
                    />                              
                    <LabelForm 
                      _class={`font-normal text-[#ffffff] text-14 leading-[21px] font-noto-sans`} 
                      nameAttr={'commercial'}> 
                      Comercial
                    </LabelForm>
                  </li>
                  {/* Parceria*/}
                  <li class="flex flex-row gap-[8px] lg:flex-row items-center">
                    <InputForm
                      nameAttr={"partnership"}
                      type={"checkbox"}
                      id={"partnership"}
                      _class={`n1-radio-custom checked:is-active relative appearance-none rounded-[10px] 
                      bg-transparent w-[32px] h-[32px] border-2 border-[#F3F4F7] outline-none`}                    
                    />                              
                    <LabelForm 
                      _class={`font-normal text-[#ffffff] text-14 leading-[21px] font-noto-sans`} 
                      nameAttr={'partnership'}> 
                      Parceria
                    </LabelForm>
                  </li> 
                  {/* Outros*/}
                  <li class="flex flex-row gap-[8px] lg:flex-row items-center">
                    <InputForm
                      nameAttr={"others"}
                      type={"checkbox"}
                      id={"others"}
                      _class={`n1-radio-custom checked:is-active relative appearance-none rounded-[10px] 
                      bg-transparent w-[32px] h-[32px] border-2 border-[#F3F4F7] outline-none`}                    
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
                          placeholder={"Seu nome"}
                          name={"nameUser"}
                          id={"nameUser"}
                          type={"text"}
                          class={`rounded-[24px] bg-transparent py-[12px] px-[20px] max-h-[42px] border border-[#F3F4F7] duration-300
                            font-medium text-[#ffffff] text-12 leading-[18px] font-noto-sans outline-none focus:border-[#646363]`}                    
                      />
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
                          class={`rounded-[24px] bg-transparent py-[12px] px-[20px] max-h-[42px] border border-[#F3F4F7] duration-300
                          font-medium text-[#ffffff] text-12 leading-[18px] font-noto-sans outline-none focus:border-[#646363]`}
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
                          placeholder="(00) 00000-0000"
                          name="phoneNumber"
                          type="text"
                          id="phoneNumber"
                          class={`w-full rounded-[24px] bg-transparent py-[12px] px-[20px] max-h-[42px] border border-[#F3F4F7] duration-300
                          font-medium text-[#ffffff] text-12 leading-[18px] font-noto-sans outline-none focus:border-[#646363]`}
                      />
                      
                  </div>
                  {/* Email*/}
                  <div class="form-control gap-[10px] w-full">
                      <div class="form-control gap-[10px] w-full">
                          <LabelForm 
                              _class="font-bold text-[#ffffff] text-14 leading-[21px] font-noto-sans" 
                              nameAttr="email">
                                  E-mail
                          </LabelForm>
                          <InputForm
                              placeholder="Seu melhor e-mail"
                              nameAttr="email"
                              id="email"
                              type="email"
                              _class={`rounded-[24px] bg-transparent py-[12px] px-[20px] max-h-[42px] border border-[#F3F4F7] duration-300
                              font-medium text-[#ffffff] text-12 leading-[18px] font-noto-sans outline-none focus:border-[#646363]`}
                          />
                      </div>
                  </div>
              </div>
              {/* Mensagem*/}
              <div class="form-control gap-[32px]">
                  <label class="font-bold text-[#ffffff] text-24 leading-[21px] font-archimoto-medium" for="message">Mensagem</label>
                  <textarea
                      placeholder="Sua mensagem aqui"
                      name="message"
                      id="message"
                      type="text"
                      class={`bg-transparent rounded-[38px] h-[90px] border border-[#F3F4F7] py-[20px] px-[40px] duration-300
                        font-medium text-[#ffffff] text-12 leading-[18px] font-noto-sans outline-none focus:border-[#646363]`}
                  />
              </div>
              {/* DADOS __________________________________________________________________________________| FINAL | */}

              <div>
                <input
                  type="submit" 
                  class={`py-[20px] px-[30px] bg-base-200 rounded-[100px] text-[#585858] hover:bg-[#ffff] 
                    max-h-[52px] !leading-none text-16 font-archimoto-medium font-black`}
                    value="Enviar" 
                  />
              </div>
            </form>
          </div>
        </div>
      </div>
      { displayModalForm.value && (
        <div>
          <ModalForm image={image} text={text} device={device} />
        </div>
      )}
    </>
  );
}

export const loader = (props: Props, _req: Request, ctx: FnContext) => {
  return {
    ...props,
    device: ctx.device,
  };
};


export default ContactForm;
