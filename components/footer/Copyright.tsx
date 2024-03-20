interface Props {
  copyrightText?: string;
}

function Email({ copyrightText }: Props) {
  return (
    <span class="text-14 text-base-150 font-noto-sans tracking-[0.98px]">
      {copyrightText}
    </span>
  );
}

export default Email;
