import { FC, useMemo } from "react";
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

interface FileIconsProps {
  fileType: FileTypes;
}

const FileIcon: FC<FileIconsProps> = ({ fileType }) => {
  const icon = useMemo(() => {
    switch (fileType) {
      case FileTypes.DOCUMENT:
        return <WordIcon />;
      case FileTypes.IMAGE:
        return <ImageIcon />;
      case FileTypes.EXE:
        return <ExeIcon />;
      case FileTypes.SOURCE_CODE:
        return <ProgramIcon />;
      case FileTypes.VIDEO:
        return <VideoIcon />;
      case FileTypes.PDF:
        return <PdfIcon />;
      case FileTypes.ARCHIVE:
        return <ArchiveIcon />;
      case FileTypes.AUDIO:
        return <AudioIcon />;
      case FileTypes.OTHER:
        return <OtherIcon />;

      default:
        return <OtherIcon />;
    }
  }, [fileType]);

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
