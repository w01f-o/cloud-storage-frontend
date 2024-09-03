import { FC } from "react";
import mime from "mime-types";
import {
  AppWindow,
  FileBox,
  FileImage,
  FileText,
  FileVideo,
} from "lucide-react";
import styles from "./fileIcons.module.scss";

interface FileIconsProps {
  fileType: string;
}

const FileIcons: FC<FileIconsProps> = ({ fileType }) => {
  console.log(mime.lookup(fileType));
  switch (mime.lookup(fileType)) {
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    case "application/msword":
      return (
        <div className={styles.wrapper} style={{ background: "#EEF7FE" }}>
          <svg
            width="20"
            height="20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.51.097a.404.404 0 0 0-.353-.087L.323 2.62A.431.431 0 0 0 0 3.046v14.78c0 .215.15.397.353.43l10.834 1.739a.42.42 0 0 0 .48-.43V.438a.442.442 0 0 0-.157-.34Z"
              fill="#567DF4"
            />
            <path
              d="M4.928 12.52h-1.08L2.501 7.497h.997l.92 3.723 1.005-3.723h.81l1.011 3.723.922-3.723h.997L7.815 12.52h-1.08l-.907-3.313-.9 3.313Z"
              fill="#fff"
            />
            <path
              d="M19.583 18.261H11.25a.426.426 0 0 1-.417-.434c0-.24.187-.435.417-.435h7.917V2.612H11.25a.426.426 0 0 1-.417-.435c0-.24.187-.435.417-.435h8.333c.23 0 .417.195.417.435v15.65c0 .24-.187.434-.417.434Z"
              fill="#567DF4"
            />
            <path
              d="M17.916 5.22h-6.667a.426.426 0 0 1-.416-.435c0-.24.186-.435.416-.435h6.667c.23 0 .417.195.417.435s-.187.435-.417.435ZM17.915 7.828H11.25a.426.426 0 0 1-.417-.434c0-.24.186-.435.417-.435h6.666c.23 0 .417.195.417.435s-.187.434-.417.434ZM17.915 10.437H11.25a.426.426 0 0 1-.417-.435c0-.24.186-.435.417-.435h6.666c.23 0 .417.195.417.435s-.187.435-.417.435ZM17.915 13.045H11.25a.426.426 0 0 1-.417-.434c0-.24.186-.435.417-.435h6.666c.23 0 .417.194.417.435 0 .24-.187.434-.417.434ZM17.915 15.653H11.25a.426.426 0 0 1-.417-.434c0-.24.186-.435.417-.435h6.666c.23 0 .417.194.417.435 0 .24-.187.434-.417.434Z"
              fill="#567DF4"
            />
          </svg>
        </div>
      );
    case "image/png":
    case "image/jpeg":
      return (
        <div className={styles.wrapper} style={{ background: "#EEF7FE" }}>
          <FileImage />
        </div>
      );
    case "application/x-msdos-program":
      return (
        <div className={styles.wrapper} style={{ background: "#EEF7FE" }}>
          <AppWindow />
        </div>
      );
    case "text/plain":
      return (
        <div className={styles.wrapper} style={{ background: "#EEF7FE" }}>
          <FileText />
        </div>
      );
    case "application/java-archive":
      return (
        <div className={styles.wrapper} style={{ background: "#EEF7FE" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 128 128"
            width={25}
            height={25}
          >
            <path
              fill="#0074BD"
              d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zm-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"
            />
            <path
              fill="#EA2D2E"
              d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z"
            />
            <path
              fill="#0074BD"
              d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 9.815 49.821 8.076 90.817-3.637 77.896-9.468zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.239 19.644-4.643 19.644-4.643zm40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.359-.327.468-.617z"
            />
            <path
              fill="#EA2D2E"
              d="M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587z"
            />
            <path
              fill="#0074BD"
              d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z"
            />
          </svg>
        </div>
      );
    case "video/mp4":
      return (
        <div className={styles.wrapper} style={{ backgroundColor: "#EEF7FE" }}>
          <FileVideo />
        </div>
      );

    case "image/svg+xml":
      return (
        <div className={styles.wrapper} style={{ backgroundColor: "#EEF7FE" }}>
          <FileBox />
        </div>
      );
  }
};

export default FileIcons;
