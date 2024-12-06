import Icon, { type AvailableIcons } from "site/components/ui/Icon.tsx";

/**
 * @titleBy name
 */
export interface SocialMedia {
  /**
   * @title Nome da rede social
   */
  name: "Facebook" | "X" | "Instagram" | "Linkedin" | "WhatsApp";
  /**
   * @title Link da rede social
   */
  link?: string;
  /**
   * @title Desabilitar rede social
   */
  disabledSocial?: boolean;
}

interface Props {
  socialMedia?: SocialMedia[];
}

function Compartilhar({ socialMedia }: Props) {
  const socialMediaList = socialMedia?.filter((item) => !item.disabledSocial);

  if (!socialMediaList?.length) return null;

  // TODO: add share functionality
  return (
    <div class="flex items-center gap-x-2.5">
      <span class="noto-sans text-14 text-white">Compartilhar</span>
      <ul class="flex items-center gap-x-3">
        {socialMediaList?.map((item) => (
          <li title={item.name}>
            <a href={item.link ?? "#"} target="_blank">
              <Icon
                size={20}
                id={`${item.name}2` as AvailableIcons}
                class="text-secondary"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Compartilhar;
