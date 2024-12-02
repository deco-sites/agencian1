import Icon, { type AvailableIcons } from "site/components/ui/Icon.tsx";

export interface SocialMedia {
  /**
   * @title Nome da rede social
   */
  label: "Facebook" | "X" | "Instagram" | "Linkedin" | "WhatsApp";
  /**@title Link da rede social */
  link?: string;
  /**@title Desabilitar rede social */
  disabledSocial?: boolean;
}

interface Props {
  socialMedia?: SocialMedia[];
}

function BlogCompartilhar({ socialMedia }: Props) {
  const socialMediaList = socialMedia?.filter((item) => !item.disabledSocial);

  return (
    <div class="flex items-center gap-x-2.5">
      <span class="text-14">Compartilhar</span>
      <ul class="flex items-center gap-x-3">
        {socialMediaList?.map((item) => (
          <li title={item.label}>
            <a href={item.link ?? "#"} target="_blank">
              <Icon
                size={20}
                id={`${item.label}2` as AvailableIcons}
                class="text-secondary"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlogCompartilhar;
