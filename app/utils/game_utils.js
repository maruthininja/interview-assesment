export const sample = (items, count) => {
  return [...items].sort(() => Math.random() - 0.5).slice(0, count);
};

export const formattedGameImageUrl = (game, { baseUrl, fallback = 'https://placehold.co/300x169' } = {}) => {
  const images = Array.isArray(game?.images) ? game.images : []
  const image = images.find((item) => item.image_type === 'Screenshot' || item.imageType === 'Screenshot') || images[0]
  const path = typeof image === 'string' ? image : image?.image_url || image?.imageUrl

  if (!path) return fallback
  if (!baseUrl) return path

  try {
    return new URL(path, baseUrl).toString()
  } catch {
    return fallback
  }
}

