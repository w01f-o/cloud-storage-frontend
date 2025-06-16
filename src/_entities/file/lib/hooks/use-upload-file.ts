import {
  Folder,
  invalidateFolderListQueries,
  invalidateFolderQueries,
} from '@/_entities/folder';
import { StorageQueryKeys } from '@/_entities/storage/model/enums/storage-query-keys.enum';
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
      onMutate?.({ file, storeId, folderId });

      addFile({
        name: file.name,
        id: storeId,
        abortController: new AbortController(),
      });
      cancelFileListQueries(queryClient);
    },
    onSuccess: (newFile, variables, context) => {
      onSuccess?.(newFile, variables, context);

      queryClient.setQueriesData<PaginatedResult<FileEntity>>(
        { queryKey: [FileQueryKeys.LIST] },
        old => {
          if (!old) return old;

          return {
            ...old,
            list: [
              {
                ...newFile,
                createdAt: new Date(newFile.createdAt),
                updatedAt: new Date(newFile.updatedAt),
                size: BigInt(newFile.size),
              },
              ...old.list.slice(0, old.meta.perPage - 1),
            ],
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
                  list: [
                    {
                      ...newFile,
                      createdAt: new Date(newFile.createdAt),
                      updatedAt: new Date(newFile.updatedAt),
                      size: BigInt(newFile.size),
                    },
                    ...page.list.slice(0, page.meta.perPage - 1),
                  ],
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
    },
    onSettled: (data, error, { file, storeId, folderId }, context) => {
      onSettled?.(data, error, { file, storeId, folderId }, context);

      removeFile(storeId);
      invalidateFileListQueries(queryClient);
      queryClient.invalidateQueries({ queryKey: [StorageQueryKeys.USER] });

      invalidateFolderListQueries(queryClient);
      if (data?.folderId) {
        invalidateFolderQueries(queryClient, data.folderId);
      }
    },
    ...options,
  });
};
