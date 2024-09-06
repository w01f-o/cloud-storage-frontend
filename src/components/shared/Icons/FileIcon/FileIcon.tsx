import { FC, SVGAttributes, useMemo } from "react";
import styles from "./fileIcons.module.scss";
import { Utils } from "@/services/utils";
import WordIcon from "@/components/shared/Icons/WordIcon";
import PdfIcon from "@/components/shared/Icons/PdfIcon";
import ImageIcon from "@/components/shared/Icons/ImageIcon";
import ExeIcon from "@/components/shared/Icons/ExeIcon";
import VideoIcon from "@/components/shared/Icons/VideoIcon";
import ProgramIcon from "@/components/shared/Icons/ProgramIcon";
import OtherIcon from "@/components/shared/Icons/OtherIcon";
import ArchiveIcon from "@/components/shared/Icons/ArchiveIcon";
import { FileTypes } from "@/enums/FileTypes.enum";
import AudioIcon from "@/components/shared/Icons/AudioIcon";

interface FileIconsProps extends SVGAttributes<HTMLOrSVGElement> {
  fileType: FileTypes;
}

const FileIcon: FC<FileIconsProps> = ({ fileType, ...props }) => {
  const icon = useMemo(() => {
    switch (fileType) {
      case FileTypes.DOCUMENT:
        return <WordIcon {...props} />;
      case FileTypes.IMAGE:
        return <ImageIcon {...props} />;
      case FileTypes.EXE:
        return <ExeIcon {...props} />;
      case FileTypes.SOURCE_CODE:
        return <ProgramIcon {...props} />;
      case FileTypes.VIDEO:
        return <VideoIcon {...props} />;
      case FileTypes.PDF:
        return <PdfIcon {...props} />;
      case FileTypes.ARCHIVE:
        return <ArchiveIcon {...props} />;
      case FileTypes.AUDIO:
        return <AudioIcon {...props} />;
      case FileTypes.OTHER:
        return <OtherIcon {...props} />;

      default:
        return <OtherIcon />;
    }
  }, [fileType, props]);

  return (
    <div
      className={styles.wrapper}
      style={{
        backgroundColor: Utils.getFileStyles(fileType).color,
      }}
    >
      {icon}
    </div>
  );
};

export default FileIcon;
