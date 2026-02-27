export const ensurePunctuation = (text: string): string => {
  if (!text) return text;

  const trimmedText = text.trim();
  if (!trimmedText) return text;

  const punctuationPattern = /[.!?:;]$/;

  if (punctuationPattern.test(trimmedText)) {
    return text;
  }

  return `${text}.`;
};
