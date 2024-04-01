import type { ComponentChildren } from "preact";

interface Props{
    nameAttr?:string;
    _class?:string;
    children?:ComponentChildren;
}

function LabelForm( { _class, nameAttr, children }:Props){
    return(
        <>
            {_class && nameAttr && (
                <label class={_class} htmlFor={nameAttr}> {children} </label>
            )}
        </>
    )
}

export default LabelForm;