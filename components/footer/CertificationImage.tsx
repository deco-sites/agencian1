interface NameImage {
  linkname?: string;
}

function CertificationImage({ linkname }: NameImage) {
  return (
    <>
      <li>
        <div>
          <img src={`${linkname}`} />
        </div>
      </li>
    </>
  );
}

export default CertificationImage;
