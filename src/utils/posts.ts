interface PublishablePost {
  draft: boolean;
  publishedAt: Date;
  publishAt?: Date;
}

export function isPostPublished(data: PublishablePost, now = new Date()) {
  if (data.draft) return false;
  return (data.publishAt ?? data.publishedAt) <= now;
}
