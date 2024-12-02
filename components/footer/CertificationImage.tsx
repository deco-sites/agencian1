interface NameImage {
  linkname?: string;
}

function CertificationImage({ linkname }: NameImage) {
  return (
    <li>
      <img
        src={`${linkname}`}
        className="w-[150px] object-contain"
        loading="lazy"
        alt="Certification"
      />
    </li>
  );
}

export default CertificationImage;
