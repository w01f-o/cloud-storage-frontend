import { FC } from "react";

interface ImageIconProps {}

const ImageIcon: FC<ImageIconProps> = ({}) => {
  return (
    <svg width="23" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity=".3"
        d="M19.118 6.381a2.806 2.806 0 0 1-1.95-.783 2.632 2.632 0 0 1-.809-1.889V0H4.031c-.473 0-.942.09-1.379.266a3.61 3.61 0 0 0-1.168.756c-.334.324-.6.709-.78 1.132C.523 2.577.43 3.03.43 3.489V24.51c0 .458.093.912.274 1.335.18.424.446.808.78 1.132.334.324.731.581 1.168.756.437.176.906.266 1.379.266h14.798c.473 0 .941-.09 1.378-.266a3.613 3.613 0 0 0 1.169-.756c.334-.324.6-.709.78-1.132.181-.423.274-.877.274-1.335V6.383l-3.312-.002Z"
        fill="#00C650"
      />
      <path
        d="M22.43 6.381h-3.312a2.807 2.807 0 0 1-1.95-.783 2.632 2.632 0 0 1-.809-1.889V0l6.07 6.381ZM14.385 18.975h-5.91a2.221 2.221 0 0 1-1.542-.62 2.083 2.083 0 0 1-.64-1.494v-5.725c0-.56.23-1.097.64-1.493.41-.397.964-.62 1.542-.62h5.91a2.22 2.22 0 0 1 1.542.62c.41.396.64.933.64 1.493v5.725c0 .56-.23 1.097-.64 1.494a2.22 2.22 0 0 1-1.542.62Zm-5.91-9.018a1.24 1.24 0 0 0-.86.346c-.229.221-.357.52-.357.833v5.725c0 .313.128.612.357.833.228.222.537.346.86.346h5.91c.323 0 .633-.124.86-.346.229-.22.357-.52.357-.833v-5.725a1.16 1.16 0 0 0-.357-.833 1.238 1.238 0 0 0-.86-.346h-5.91Z"
        fill="#00C650"
      />
      <path
        d="M16.085 15.772v1.089c0 .436-.18.855-.498 1.163a1.73 1.73 0 0 1-1.201.483h-5.91c-.451 0-.883-.174-1.202-.482a1.62 1.62 0 0 1-.498-1.164v-1.828c.946-.197 2.387-.259 4.136.418l1.084-1 .738 1.814s.198-.668.838-.573c.64.095 1.675.43 2.118.144.12-.067.26-.09.395-.064ZM14.015 12.305a.647.647 0 0 0 .657-.636.647.647 0 0 0-.657-.636.647.647 0 0 0-.657.636c0 .351.294.636.657.636Z"
        fill="#00C650"
      />
    </svg>
  );
};

export default ImageIcon;
