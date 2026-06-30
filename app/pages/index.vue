<template>
  <main class="landing-page">
    <section class="games-section" aria-labelledby="games-heading">

      <section class="games-section__header">
        <!-- headerComponent :: start -->
        <div>
          <h1 id="games-heading">Interview Assesment</h1>
          <ul>
            <li>Top games from 2015-2017 [Static Date]</li>
            <li>15 random releases from 2015-2017 [Static Date]</li>
          </ul>
        </div>
        <!-- headerComponent :: end -->

        <!-- filterComponent :: start  -->
        <label class="sort-control">
          <span>Sort by</span>
          <select v-model="sortOption">
            <option value="rating">Average rating</option>
            <option value="releaseDate">Release date</option>
          </select>
        </label>
        <!-- filterComponent :: end -->
      </section>

      <section>
        <div v-if="pending" class="games-section__status">Loading..</div>
        <div v-else-if="error" class="games-section__status">
          {{ error.message }}
        </div>
        <div v-else-if="!filteredGames.length" class="games-section__status">
          Games Not found.
        </div>
        <div v-else class="games-grid">
          <MyGameCard v-for="game in filteredGames" :key="game.id" :game="game" />
        </div>
      </section>

    </section>
  </main>
</template>

<script setup lang="js">
const { fetchGames } = useGames();

// default filter option
const sortOption = ref("rating");

// fetch games
const {
  data,
  pending,
  error,
} = await useAsyncData("landing-games", fetchGames);

// filter games
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
  background: #f6f8fb;
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
      color: gray;
      font-size: clamp(1.75rem, 3vw, 2.5rem);
      line-height: 1.1;
    }

    p {
      margin: 0.5rem 0 0;
      color: gray;
    }
  }

  &__status {
    padding: 1rem;
    border: 1px solid #d8e0ea;
    border-radius: 8px;
    background: #fff;
    color: gray;
  }
}

.sort-control {
  display: grid;
  gap: 0.375rem;
  min-width: 12rem;
  color: gray;
  font-size: 0.875rem;
  font-weight: 700;

  select {
    min-height: 2.5rem;
    padding: 0 0.75rem;
    border: 1px solid #c7d2df;
    border-radius: 6px;
    background: #fff;
    color: gray;
    font: inherit;
  }
}

.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  gap: 1.25rem;
  align-items: stretch;
}

@media (max-width: 640px) {
  .games-section__header {
    align-items: stretch;
    flex-direction: column;
  }

  .sort-control {
    min-width: 0;
  }
}
</style>
