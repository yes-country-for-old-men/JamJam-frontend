import { useCallback } from 'react';
import type { FileWithId } from '@/shared/types/FileWithId';

interface UseFileListOptions {
  files: FileWithId[];
  onChange: (files: FileWithId[]) => void;
  maxFiles?: number;
  filter?: (file: File) => boolean;
}

const useFileList = ({
  files,
  onChange,
  maxFiles,
  filter,
}: UseFileListOptions) => {
  const remainingSlots = maxFiles != null ? maxFiles - files.length : Infinity;
  const isAtCapacity = remainingSlots <= 0;

  const addFiles = useCallback(
    (rawFiles: File[]) => {
      let filtered = filter ? rawFiles.filter(filter) : rawFiles;
      if (maxFiles != null) {
        filtered = filtered.slice(0, maxFiles - files.length);
      }
      if (filtered.length === 0) return;

      const newFilesWithId: FileWithId[] = filtered.map((file) => ({
        id: crypto.randomUUID(),
        file,
      }));
      onChange([...files, ...newFilesWithId]);
    },
    [files, onChange, maxFiles, filter],
  );

  const removeFile = useCallback(
    (id: string | number) => {
      onChange(files.filter((f) => f.id !== id));
    },
    [files, onChange],
  );

  return { addFiles, removeFile, remainingSlots, isAtCapacity };
};

export default useFileList;
