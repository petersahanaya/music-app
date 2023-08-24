"use client";

export type IconProps = {
  color?: string;
  className?: string;
  size: number;
};

const LoaderIcon = ({ size, color = "#000000", className }: IconProps) => {
  return (
    <div className={className}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            d="M12 3C10.22 3 8.47991 3.52784 6.99987 4.51677C5.51983 5.50571 4.36628 6.91131 3.68509 8.55585C3.0039 10.2004 2.82567 12.01 3.17294 13.7558C3.5202 15.5016 4.37737 17.1053 5.63604 18.364C6.89472 19.6226 8.49836 20.4798 10.2442 20.8271C11.99 21.1743 13.7996 20.9961 15.4442 20.3149C17.0887 19.6337 18.4943 18.4802 19.4832 17.0001C20.4722 15.5201 21 13.78 21 12"
            stroke={color}
            stroke-width="2"
            stroke-linecap="round"
          ></path>{" "}
          <path
            d="M19.7942 7.5C19.8905 7.66673 19.9813 7.83651 20.0667 8.00907"
            stroke={color}
            stroke-width="2"
            stroke-linecap="round"
          ></path>{" "}
        </g>
      </svg>
    </div>
  );
};

export default LoaderIcon;
