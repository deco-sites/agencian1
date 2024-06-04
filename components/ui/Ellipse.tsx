export interface Ellipse {
  horizontal: "left" | "center" | "right";
  vertical: "top" | "center" | "bottom";
  width: "100" | "200" | "300";
  height: "100" | "200" | "300";
  color: "yellow" | "blue";
  activeDesktop?: boolean;
  activeMobile?: boolean;
}

interface Props {
  ellipse: Ellipse;
}

const horizontalClasses = {
  left: "-left-4",
  center: "left-1/2 transform -translate-x-1/2",
  right: "-right-4",
};

const verticalClasses = {
  top: "-top-6",
  center: "top-1/2 transform -translate-y-1/2",
  bottom: "bottom-0",
};

const widthEllipse = {
  100: "lg:w-28",
  200: "lg:w-52",
  300: "lg:w-80",
};

const heightEllipse = {
  100: "lg:h-28",
  200: "lg:h-52",
  300: "lg:h-80",
};

const colorEllipse = {
  yellow: "n1-custom-color-yellow-ellipse",
  blue: "n1-custom-color-blue-ellipse",
};

export default function Ellipse({ ellipse }: Props) {
  const {
    width,
    height,
    horizontal,
    vertical,
    activeDesktop,
    activeMobile,
    color,
  } = ellipse;
  return (
    <div
      class={`absolute 
          ${widthEllipse[width || "100"]} 
          ${heightEllipse[height || "100"]}
          ${verticalClasses[vertical || "top"]}
          ${horizontalClasses[horizontal || "left"]}
          ${colorEllipse[color || "yellow"]}
          ${activeDesktop ? "lg:block" : "lg:hidden"}
          ${activeMobile ? "block" : "hidden"}
          w-56
          h-56
          blur-[82px]
          rounded-[100px]
          opacity-30
        } `}
    >
    </div>
  );
}
