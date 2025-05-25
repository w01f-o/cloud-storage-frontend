import { Folder } from '@/_entities/folder';
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
import { cancelFileListQueries } from '../utils/cancel-file-list-queries';
import { invalidateFileListQueries } from '../utils/invalidate-file-list-queries';

interface UseUploadFileParams {
  storeId: string;
  folderId: Folder['id'];
  file: File;
}

export const useUploadFile = ({
  onMutate,
  onSettled,
  onSuccess,
  ...options
}: MutationHookOptions<FileEntity, UseUploadFileParams, AxiosError> = {}) => {
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

  return useMutation<FileEntity, AxiosError, UseUploadFileParams>({
    mutationKey: [FileMutationKeys.UPLOAD],
    mutationFn: async ({ file, storeId, folderId }) => {
      const abortController = new AbortController();
      setAbortController(storeId, abortController);

      return uploadFile(
        { file, folderId },
        {
          signal: abortController.signal,
          onProgress: progress => {
            updateFileProgress(storeId, progress);
          },
        }
      );
    },
    onMutate: async ({ file, storeId, folderId }) => {
      addFile({
        name: file.name,
        id: storeId,
        abortController: new AbortController(),
      });
      await cancelFileListQueries(queryClient);

      onMutate?.({ file, storeId, folderId });
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
    onSettled: async (data, error, { file, storeId, folderId }, context) => {
      await invalidateFileListQueries(queryClient);
      removeFile(storeId);

      onSettled?.(data, error, { file, storeId, folderId }, context);
    },
    ...options,
  });
};
