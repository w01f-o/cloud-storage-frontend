import { FC, useMemo } from "react";
import {
  AppWindow,
  FileBox,
  FileImage,
  FileText,
  FileVideo,
} from "lucide-react";
import styles from "./fileIcons.module.scss";
import { Utils } from "@/services/utils";
import WordIcon from "@/components/shared/Icons/WordIcon";
import JavaIcon from "@/components/shared/Icons/JavaIcon";

interface FileIconsProps {
  fileType: string;
}

const FileIcons: FC<FileIconsProps> = ({ fileType }) => {
  const icon = useMemo(() => {
    switch (fileType) {
      case "msword":
        return <WordIcon />;
      case "image":
        return <FileImage />;
      case "exe":
        return <AppWindow />;
      case "txt":
        return <FileText />;
      case "jar":
        return <JavaIcon />;
      case "video":
        return <FileVideo />;

      default:
        return <FileBox />;
    }
  }, [fileType]);

  return (
    <div
      className={styles.wrapper}
      style={{
        backgroundColor: Utils.saturateColor(
          Utils.getInfoStyles(fileType).color,
          -0.03,
        ),
      }}
    >
      {icon}
    </div>
  );
};

export default FileIcons;
