function sharedTopicCount(aTopics = [], bTopics = []) {
  const bSlugs = new Set(bTopics.map((topic) => topic.slug).filter(Boolean));
  return aTopics.filter((topic) => bSlugs.has(topic.slug)).length;
}

export function pickRelatedPosts(items, currentPost, limit = 5) {
  if (!currentPost?.slug || !Array.isArray(items) || items.length === 0) {
    return [];
  }

  const candidates = items.filter((item) => item.slug !== currentPost.slug);

  const scored = candidates
    .map((item) => ({
      item,
      score: sharedTopicCount(
        currentPost.taxonomies?.topics ?? [],
        item.taxonomies?.topics ?? [],
      ),
      date: item.dateIso ? new Date(item.dateIso).getTime() : 0,
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.date - a.date;
    });

  const withSharedTopics = scored.filter((entry) => entry.score > 0);
  const source = withSharedTopics.length > 0 ? withSharedTopics : scored;

  return source.slice(0, limit).map((entry) => entry.item);
}
