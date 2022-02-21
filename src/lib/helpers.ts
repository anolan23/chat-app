export function getChannelAbbrev(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2);
}

export function dateString(created_at: string): string {
  const date = new Date(created_at);

  const difference = Date.now() - date.valueOf();
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
