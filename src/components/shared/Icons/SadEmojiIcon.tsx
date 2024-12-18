import { FC, SVGAttributes } from "react";

interface SadEmojiIconProps extends SVGAttributes<HTMLOrSVGElement> {}

const SadEmojiIcon: FC<SadEmojiIconProps> = ({ ...props }) => {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M2 32c0 16.6 13.4 30 30 30s30-13.4 30-30S48.6 2 32 2 2 15.4 2 32z"
        fill="#ffdd67"
      />
      <path
        d="M47.7 37.6c0 8.6 11.7 8.6 11.7 0 0-6.3-5.8-12.4-5.8-12.4s-5.9 6.1-5.9 12.4"
        fill="#65b1ef"
      />
      <g fill="#664e27">
        <circle cx="38.5" cy="35" r="5" />
        <circle cx="15.5" cy="35" r="5" />
      </g>
      <path
        d="M20.6 19.9c-3.2 2.7-7.5 3.9-11.7 3.1-.6-.1-1.1 2-.4 2.2 4.8.9 9.8-.5 13.5-3.6.5-.5-1-2.1-1.4-1.7m24.5 3c-4.2.7-8.5-.4-11.7-3.1-.4-.4-2 1.2-1.4 1.7 3.7 3.2 8.7 4.5 13.5 3.6.7-.2.2-2.3-.4-2.2"
        fill="#917524"
      />
      <path
        d="M38.1 47.3c-5.8-1.5-12-.4-16.9 3-1.2.9 1.1 4 2.3 3.2 3.2-2.3 8.4-3.8 13.7-2.4 1.3.3 2.4-3.3.9-3.8"
        fill="#664e27"
      />
    </svg>
  );
};

export default SadEmojiIcon;
