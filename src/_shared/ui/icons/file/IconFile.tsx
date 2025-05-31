import { ResolvedFileTypes } from '@/_entities/file';
import { FC, SVGAttributes } from 'react';
import { IconArchive } from './ArchiveIcon';
import { IconAudio } from './AudioIcon';
import { IconExe } from './ExeIcon';
import { IconImage } from './ImageIcon';
import { IconOther } from './OtherIcon';
import { IconSourceCode } from './SourceCodeIcon';
import { IconVideo } from './VideoIcon';
import { IconWord } from './WordIcon';

interface IconFileProps extends SVGAttributes<HTMLOrSVGElement> {
  type: ResolvedFileTypes;
}

export const IconFile: FC<IconFileProps> = ({ type, ...props }) => {
  switch (type) {
    case ResolvedFileTypes.DOCUMENT:
      return <IconWord {...props} />;
    case ResolvedFileTypes.IMAGE:
      return <IconImage {...props} />;
    case ResolvedFileTypes.EXE:
      return <IconExe {...props} />;
    case ResolvedFileTypes.CODE:
      return <IconSourceCode {...props} />;
    case ResolvedFileTypes.VIDEO:
      return <IconVideo {...props} />;
    case ResolvedFileTypes.ARCHIVE:
      return <IconArchive {...props} />;
    case ResolvedFileTypes.AUDIO:
      return <IconAudio {...props} />;
    case ResolvedFileTypes.MODEL:
      return <IconOther {...props} />;
    case ResolvedFileTypes.FONT:
      return <IconOther {...props} />;
    case ResolvedFileTypes.TEXT:
      return <IconOther {...props} />;
    case ResolvedFileTypes.OTHER:
      return <IconOther {...props} />;

    default:
      return <IconOther />;
  }
};
