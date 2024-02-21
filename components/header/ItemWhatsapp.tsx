import LinkButtonWithArrow from '$store/components/ui/LinkButtonWithArrow.tsx';

interface Props{
    nameItemScape?: string | undefined;
    url?: string  | undefined;
    name?: string  | undefined;
}

function ItemWhatsapp( { nameItemScape, url, name }: Props ){
    return(
        <>
          <li class={`group flex items-center text-16 uppercase is-${nameItemScape}`}>
            <LinkButtonWithArrow url={url} name={name} />
          </li>        
        </>
    )
}

export default ItemWhatsapp;