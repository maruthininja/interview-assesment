import { sample } from "@/utils/game_utils";

export const useGames = () => {
  const config = useRuntimeConfig();

  const fetchGames = async () => {
    //TODO: you can provide dates dynamically later if needed
    const gamesIdsList = await $fetch(
      `${config.public.apiBaseUrl}/games/by-date-range?from=2015-01-01&to=2017-12-31`,
    );

    return Promise.all(
      sample(gamesIdsList.ids, 15).map(async (id) => {
        const [gameRes, statsRes] = await Promise.all([
          $fetch(`${config.public.apiBaseUrl}/games/${id}`), // fetch for release date
          $fetch(`${config.public.apiBaseUrl}/games/${id}/stats`), // fetch for average rating
        ]);

        return {
          ...gameRes.data,
          average_rating: Number(statsRes.data?.average_rating),
          total_reviews: Number(statsRes.data?.total_reviews),
        };
      }),
    );
  };

  return {
    fetchGames,
  };
};
