import Image from "apps/website/components/Image.tsx";

interface NameImage {
  linkname?: string;
}

function CertificationImage({ linkname }: NameImage) {
  return (
    <li>
      <Image
        src={`${linkname}`}
        class="w-[150px] object-contain"
        loading="lazy"
        alt="Certification"
        width={150}
        height={60}
      />
    </li>
  );
}

export default CertificationImage;
