<template>
  <div class="landing-page">
    <div class="games-section" aria-labelledby="games-heading">

      <!-- header :: start -->
      <div class="games-section__header">
        <div>
          <h1 id="games-heading">Interview Assesment</h1>
        </div>
        <label class="sort-control">
          <span>Sort by</span>
          <select v-model="sortOption">
            <option value="rating">Average rating</option>
            <option value="releaseDate">Release date</option>
          </select>
        </label>
      </div>
      <!-- header :: end -->

      <!-- games grid :: start -->
      <div>
        <div v-if="pending" class="games-section__status">Loading..</div>
        <div v-else-if="error" class="games-section__status">
          {{ error.message }}
        </div>
        <div v-else-if="!filteredGames.length" class="games-section__status">
          Games Not found.
        </div>
        <div v-else class="games-grid">
          <GameCard v-for="game in filteredGames" :key="game.id" :game="game" />
        </div>
      </div>
      <!-- games grid :: end -->
    </div>
  </div>
</template>

<script setup lang="js">
const { fetchGames } = useGames();

const sortOption = ref("rating");

const {
  data,
  pending,
  error,
} = await useAsyncData("landing-games", fetchGames);

const filteredGames = computed(() => {
  if (!data.value) return [];

  return [...data.value].sort((a, b) => {

    // sort by release date
    if (sortOption.value === "releaseDate") {
      return (
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      );
    }

    // sort by averate rating
    if (sortOption.value === "rating") {
      return b.average_rating - a.average_rating;
    }

    // if no sort option is selected, return 0
    return 0;
  });
});
</script>

<style lang="scss" scoped>
.landing-page {
  min-height: 100vh;
  padding: 1rem clamp(1rem, 4vw, 3rem);
  background: $color-page-background;
}

.games-section {
  width: 100%;
  margin: 0 auto;

  &__header {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.5rem;

    h1 {
      margin: 0;
      color: $color-secondary;
      font-size: clamp(1.75rem, 3vw, 2.5rem);
      line-height: 1.1;
    }

    p {
      margin: 0.5rem 0 0;
      color: $color-secondary;
    }
  }

  &__status {
    padding: 1rem;
    border: 1px solid $color-border-muted;
    border-radius: 8px;
    background: $color-surface;
    color: $color-secondary;
  }
}

.sort-control {
  display: grid;
  gap: 0.375rem;
  min-width: 12rem;
  color: $color-secondary;
  font-size: 0.875rem;
  font-weight: 700;

  select {
    min-height: 2.5rem;
    padding: 0 0.75rem;
    border: 1px solid $color-border-control;
    border-radius: 6px;
    background: $color-surface;
    color: $color-secondary;
    font: inherit;
  }
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  gap: 1.25rem;
  align-items: stretch;
}

@media (max-width: $breakpoint-sm) {
  .games-section__header {
    align-items: stretch;
    flex-direction: column;
  }

  .sort-control {
    min-width: 0;
  }
}
</style>
