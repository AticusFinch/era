/**
 * Calculate reading time for content
 * @param {string} content - HTML content string
 * @param {number} wordsPerMinute - Average reading speed (default: 200)
 * @returns {string} Formatted reading time (e.g., "5 min read")
 */
export function calculateReadingTime(content, wordsPerMinute = 200) {
  if (!content) return "1 min read";

  // Strip HTML tags
  const text = content.replace(/<[^>]*>/g, "");

  // Count words (split by whitespace and filter empty strings)
  const words = text.split(/\s+/).filter((word) => word.length > 0).length;

  // Calculate minutes (round up)
  const minutes = Math.ceil(words / wordsPerMinute);

  // Return formatted string
  return `${minutes} min read`;
}
