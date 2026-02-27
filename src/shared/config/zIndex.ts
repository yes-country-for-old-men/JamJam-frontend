export const Z_INDEX = {
  BASE: 10,
  HEADER: 20,
  IMAGE_OVERLAY: 30,
  MODAL_BASE: 1000,
} as const;

export const getModalZIndex = (stackIndex: number): number => {
  return Z_INDEX.MODAL_BASE + stackIndex * 10;
};
