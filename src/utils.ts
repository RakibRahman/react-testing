export const truncateText = (text: string, maxLength: number): string => {
  return text.substring(0, maxLength) + (text.length > maxLength ? "..." : "");
};
