import { MutationHookOptions } from '@/_shared/model';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useShallow } from 'zustand/react/shallow';
import { uploadFile } from '../../api/requests';
import { MutationFileKeys } from '../../model/enums/mutation-keys.enum';
import { File as FileEntity } from '../../model/types/file.type';
import { useUploadFileProgresses } from '../stores/upload-progresses-store';
import { cancelFileListQueries } from '../utils/cancelFileListQueries';
import { invalidateFileListQueries } from '../utils/invalidateFileListQueries';

export const useUploadFile = (
  options?: MutationHookOptions<
    FileEntity,
    { id: string; file: File },
    AxiosError
  >
) => {
  const { onMutate, onSettled, ...rest } = options ?? {};
  const queryClient = useQueryClient();
  const { addFile, removeFile, updateFileProgress, setAbortController } =
    useUploadFileProgresses(
      useShallow(state => ({
        addFile: state.addFile,
        removeFile: state.removeFile,
        updateFileProgress: state.updateFileProgress,
        setAbortController: state.setAbortController,
      }))
    );

  return useMutation<FileEntity, AxiosError, { id: string; file: File }>({
    mutationFn: async ({ file, id }) => {
      const abortController = new AbortController();
      setAbortController(id, abortController);

      return uploadFile(file, {
        signal: abortController.signal,
        onProgress: progress => {
          updateFileProgress(id, progress);
        },
      });
    },
    mutationKey: [MutationFileKeys.UPLOAD],
    onMutate: async ({ file, id }) => {
      addFile({ name: file.name, id, abortController: new AbortController() });
      await cancelFileListQueries(queryClient);

      onMutate?.({ file, id });
    },
    onSettled: async (data, error, { file, id }, context) => {
      invalidateFileListQueries(queryClient);
      removeFile(id);

      onSettled?.(data, error, { file, id }, context);
    },
    ...rest,
  });
};
