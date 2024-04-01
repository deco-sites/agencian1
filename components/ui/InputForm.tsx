import { clx } from "$store/sdk/clx.ts";

interface Props{
    placeholder?:string;
    nameAttr?:string;
    type?:string;
    _class?:string;
    checked?:boolean;
    id?:string;
}

function InputForm( { placeholder, nameAttr, type, _class, checked, id }:Props){
    return(
        <>            
            <input
                placeholder={placeholder}
                name={nameAttr}
                type={type}
                class={clx(_class)}
                checked={checked}
                id={id}
            />            
        </>
    )
}

export default InputForm;