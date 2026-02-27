import { useState, useEffect } from 'react';

const useObjectUrl = (
  source: File | string | null | undefined,
): string | null => {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl = null;

    if (!source) {
      setUrl(null);
    } else if (typeof source === 'string') {
      setUrl(source);
    } else {
      objectUrl = URL.createObjectURL(source);
      setUrl(objectUrl);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [source]);

  return url;
};

export default useObjectUrl;
