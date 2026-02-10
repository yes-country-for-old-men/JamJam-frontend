import React, { useState, useCallback } from 'react';

interface UseDropZoneOptions {
  onDrop: (files: File[]) => void;
  disabled?: boolean;
}

const useDropZone = ({ onDrop, disabled = false }: UseDropZoneOptions) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) {
        setIsDragOver(true);
      }
    },
    [disabled],
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (disabled) return;
      const files = Array.from(e.dataTransfer.files);
      onDrop(files);
    },
    [onDrop, disabled],
  );

  return {
    isDragOver,
    dropZoneProps: {
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
    },
  };
};

export default useDropZone;
