import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

interface ImageGeneric {
  src?: ImageWidget;
  width?: number;
  height?: number;
}

interface SocialMedia {
  alt?: string;
  link?: string;
  desktop?: ImageGeneric;
  mobile?: ImageGeneric;
}

interface Content {
  socialMedia?: SocialMedia[];
}

function BlogSocialMidia({ socialMedia }: Content) {
  return (
    <>
      <div class="flex items-center gap-x-2.5">
        <span class="text-14">Compartilhar</span>
        <ul class="flex items-center gap-x-2.5">
          {socialMedia && socialMedia.length > 0 &&
            socialMedia.map(({ alt, link, desktop, mobile }) => {
              return (
                <>
                  <li>
                    <a
                      href={link ? link : "#"}
                      style={{
                        pointerEvents: link ? "all" : "none",
                      }}
                    >
                      <Picture class={``}>
                        {desktop?.src && desktop?.width && desktop?.height && (
                          <Source
                            media="(min-width: 1025px)"
                            src={desktop.src}
                            width={desktop.width}
                            height={desktop.height}
                          />
                        )}
                        {mobile?.src && mobile?.width && mobile?.height && (
                          <Source
                            media="(max-width: 1024px)"
                            src={mobile.src}
                            width={mobile.width}
                            height={mobile.height}
                          />
                        )}
                        <img
                          src={desktop?.src}
                          width={desktop?.width}
                          height={desktop?.height}
                          loading={"lazy"}
                          alt={alt ? alt : "Social mídia"}
                        />
                      </Picture>
                    </a>
                  </li>
                </>
              );
            })}
        </ul>
      </div>
    </>
  );
}

export default BlogSocialMidia;
