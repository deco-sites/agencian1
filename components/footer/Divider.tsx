
interface Props{
  style?: string | null;
}

export default function Divider( {style}:Props ) {
  return (
    <div class="w-full flex">
      <div class={`w-full border-b ${style ? style : ""}`}></div>
    </div>
  );
}
