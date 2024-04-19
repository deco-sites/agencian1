import type { ImageWidget } from "apps/admin/widgets.ts";
import { Head } from "$fresh/runtime.ts";

interface Address {
  streetAddress?: string;
  addressLocality?: string;
  addressCountry?: string;
  addressRegion?: string;
  postalCode?: string;
}

interface Props {
  image?: ImageWidget;
  url?: string;
  sameAs?: Array<string>;
  logo?: ImageWidget;
  name?: string;
  description?: string;
  email?: string;
  telephone?: string;
  address?: Address;
  vatID?: string;
  iso6523Code?: string;
}

function Schema(
  {
    image,
    url,
    sameAs,
    logo,
    name,
    description,
    email,
    telephone,
    address,
    vatID,
    iso6523Code,
  }: Props,
) {
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "image": image,
            "url": url,
            "sameAs": sameAs,
            "logo": logo,
            "name": name,
            "description": description,
            "email": email,
            "telephone": telephone,
            "address": address,
            "vatID": vatID,
            "iso6523Code": iso6523Code,
          }),
        }}
      />
    </Head>
  );
}

export default Schema;
