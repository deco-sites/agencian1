interface Props{
    url?: string  | undefined;
    name?: string  | undefined;
}

function LinkButtonWithArrow( {url, name}:Props ){
    return(
        <a href={url} class="btn bg-accent n1-btn-header-item--rounded">
            <span class="text-primary text-16 pt-[5px]">
                {name}
            </span>
            <div class="rounded-[50%] p-[5px] bg-[#F8BC33]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.83333 5.83333C5.83333 5.3731 6.20643 5 6.66667 5H14.1667C14.6269 5 15 5.3731 15 5.83333V13.3333C15 13.7936 14.6269 14.1667 14.1667 14.1667C13.7064 14.1667 13.3333 13.7936 13.3333 13.3333V7.84518L6.42259 14.7559C6.09715 15.0814 5.56951 15.0814 5.24408 14.7559C4.91864 14.4305 4.91864 13.9028 5.24408 13.5774L12.1548 6.66667H6.66667C6.20643 6.66667 5.83333 6.29357 5.83333 5.83333Z" fill="#0C1F59"/>
                </svg>
            </div>
        </a>        
    )
}

export default LinkButtonWithArrow;