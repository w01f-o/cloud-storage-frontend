import { ResolvedFileTypes } from '../../model/enums/resolved-file-types.enum';

export const getFileColor = (
  type: ResolvedFileTypes,
  opacityColor: number = 0.5
) => {
  const filesStyles: Record<ResolvedFileTypes, string> = {
    [ResolvedFileTypes.DOCUMENT]: `rgba(0,114,255,${opacityColor})`,
    [ResolvedFileTypes.IMAGE]: `rgba(0,198,80,${opacityColor})`,
    [ResolvedFileTypes.VIDEO]: `rgba(161,64,255,${opacityColor})`,
    [ResolvedFileTypes.CODE]: `rgba(255,62,76,${opacityColor})`,
    [ResolvedFileTypes.EXE]: `rgba(0,114,255,${opacityColor})`,
    [ResolvedFileTypes.ARCHIVE]: `rgba(161,64,255,${opacityColor})`,
    [ResolvedFileTypes.AUDIO]: `rgba(0,95,173,${opacityColor})`,
    [ResolvedFileTypes.FONT]: `rgba(255,153,8,${opacityColor})`,
    [ResolvedFileTypes.MODEL]: `rgba(255,153,8,${opacityColor})`,
    [ResolvedFileTypes.TEXT]: `rgba(255,153,8,${opacityColor})`,
    [ResolvedFileTypes.OTHER]: `rgba(255,153,8,${opacityColor})`,
  };

  return filesStyles[type];
};
