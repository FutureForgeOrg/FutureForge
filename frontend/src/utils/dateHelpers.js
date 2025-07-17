export function getPostedAgoText(scrappedDate) {
  const postedDate = new Date(scrappedDate);
  const now = new Date();
  const diffMs = now - postedDate;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Posted today';
  if (diffDays === 1) return 'Posted 1 day ago';
  return `Posted ${diffDays} days ago`;
}
