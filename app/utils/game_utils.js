// Helper function to pick random games or items from an array
export const sample = (items, count) => {
  return [...items].sort(() => Math.random() - 0.5).slice(0, count);
};
