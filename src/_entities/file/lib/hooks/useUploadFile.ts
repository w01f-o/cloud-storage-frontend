import { MutationHookOptions, PaginatedResult } from '@/_shared/model';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useShallow } from 'zustand/react/shallow';
import { uploadFile } from '../../api/requests';
import { FileMutationKeys } from '../../model/enums/mutation-keys.enum';
import { FileQueryKeys } from '../../model/enums/query-keys.enum';
import { File as FileEntity } from '../../model/types/file.type';
import { useUploadFileProgresses } from '../stores/upload-progresses-store';
import { cancelFileListQueries } from '../utils/cancelFileListQueries';
import { invalidateFileListQueries } from '../utils/invalidateFileListQueries';

export const useUploadFile = ({
  onMutate,
  onSettled,
  onSuccess,
  ...options
}: MutationHookOptions<
  FileEntity,
  { id: string; folderId: string; file: File },
  AxiosError
> = {}) => {
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

  return useMutation<
    FileEntity,
    AxiosError,
    { id: string; folderId: string; file: File }
  >({
    mutationFn: async ({ file, id, folderId }) => {
      const abortController = new AbortController();
      setAbortController(id, abortController);

      return uploadFile(
        { file, folderId },
        {
          signal: abortController.signal,
          onProgress: progress => {
            updateFileProgress(id, progress);
          },
        }
      );
    },
    mutationKey: [FileMutationKeys.UPLOAD],
    onMutate: async ({ file, id, folderId }) => {
      addFile({ name: file.name, id, abortController: new AbortController() });
      await cancelFileListQueries(queryClient);

      onMutate?.({ file, id, folderId });
    },
    onSuccess: (newFile, variables, context) => {
      queryClient.setQueriesData(
        { queryKey: [FileQueryKeys.LIST] },
        (old: PaginatedResult<FileEntity> | undefined) => {
          if (!old) return old;

          return {
            ...old,
            list: [newFile, ...old.list.slice(0, old.meta.perPage - 1)],
            meta: {
              ...old.meta,
              total: old.meta.total + 1,
            },
          };
        }
      );

      queryClient.setQueriesData(
        { queryKey: [FileQueryKeys.INFINITE_FOLDER_LIST, newFile.folderId] },
        (old: InfiniteData<PaginatedResult<FileEntity>> | undefined) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page, index) => {
              if (index === 0) {
                return {
                  ...page,
                  list: [newFile, ...page.list.slice(0, page.meta.perPage - 1)],
                  meta: {
                    ...page.meta,
                    total: page.meta.total + 1,
                  },
                };
              }

              return page;
            }),
          };
        }
      );
      queryClient.setQueriesData(
        { queryKey: [FileQueryKeys.INFINITE] },
        (old: InfiniteData<PaginatedResult<FileEntity>> | undefined) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page, index) => {
              if (index === 0) {
                return {
                  ...page,
                  list: [newFile, ...page.list.slice(0, page.meta.perPage - 1)],
                  meta: {
                    ...page.meta,
                    total: page.meta.total + 1,
                  },
                };
              }

              return page;
            }),
          };
        }
      );

      onSuccess?.(newFile, variables, context);
    },
    onSettled: async (data, error, { file, id, folderId }, context) => {
      await invalidateFileListQueries(queryClient);
      removeFile(id);

      onSettled?.(data, error, { file, id, folderId }, context);
    },
    ...options,
  });
};
