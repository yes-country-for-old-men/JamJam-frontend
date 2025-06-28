export const removePaddingZero = (value: string) => {
  return value.replace(/^0+/, '') || '0';
};

export const formatPhoneNumber = (value: string) => {
  const numbersOnly = value.replace(/[^0-9]/g, '');

  let formatted = numbersOnly;
  if (numbersOnly.length > 3 && numbersOnly.length <= 7) {
    formatted = `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
  } else if (numbersOnly.length > 7) {
    formatted = `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7, 11)}`;
  }

  return formatted;
};

export const formatTime = (timestamp: Date) =>
  timestamp.toLocaleTimeString('ko-KR', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

export const formatDate = (timestamp: Date) => {
  const year = timestamp.getFullYear();
  const month = String(timestamp.getMonth() + 1).padStart(2, '0');
  const day = String(timestamp.getDate()).padStart(2, '0');
  const weekday = timestamp.toLocaleDateString('ko-KR', { weekday: 'short' });

  return `${year}. ${month}. ${day}. (${weekday})`;
};

export const formatRelativeTime = (timestamp: Date) => {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return '방금 전';
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days <= 3) return `${days}일 전`;

  const year = timestamp.getFullYear();
  const month = String(timestamp.getMonth() + 1).padStart(2, '0');
  const day = String(timestamp.getDate()).padStart(2, '0');

  return `${year}. ${month}. ${day}.`;
};
