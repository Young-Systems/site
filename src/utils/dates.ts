export const EASTERN_TIME_ZONE = 'America/New_York';

interface PublishableEntry {
  data: {
    publishedAt: Date;
  };
}

export function getPublicationDate(entry: PublishableEntry) {
  return entry.data.publishedAt;
}

export function formatEasternDateTime(date: Date, style: 'short' | 'long' = 'short') {
  return new Intl.DateTimeFormat('en-US', {
    month: style === 'long' ? 'long' : 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: EASTERN_TIME_ZONE,
    timeZoneName: 'short',
  }).format(date);
}
