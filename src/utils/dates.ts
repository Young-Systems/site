export const EASTERN_TIME_ZONE = 'America/New_York';

interface PublishableEntry {
  id: string;
  collection: string;
  data: {
    publishedAt: Date;
    publishAt?: Date;
  };
}

const publicationTimeOverrides: Record<string, string> = {
  'blog/career/lessons-learned-from-my-it-career': '2026-09-21T19:21:00-04:00',
  'thoughts/career/certifications-as-a-roadmap': '2026-09-22T13:20:00-04:00',
  'thoughts/microsoft/why-i-got-the-ms-102': '2026-09-22T14:15:00-04:00',
};

export function getPublicationDate(entry: PublishableEntry) {
  if (entry.data.publishAt) return entry.data.publishAt;

  const override = publicationTimeOverrides[`${entry.collection}/${entry.id}`];
  return override ? new Date(override) : entry.data.publishedAt;
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
