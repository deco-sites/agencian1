interface NameImage {
  src?: string;
}

function CertificationImage({ src }: NameImage) {
  return (
    <li>
      <img
        src={src || ""}
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
