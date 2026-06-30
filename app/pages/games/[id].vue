<template>
  <main class="detail-page">
    <button class="back-button" type="button" @click="goBack">Back</button>

    <div v-if="pending" class="detail-status">Loading game...</div>
    <div v-else-if="error" class="detail-status">Error: {{ error.message }}</div>
    <article v-else-if="game" class="game-detail">
      <img class="game-detail__image" :src="featuredImage" :alt="game.title" width="150" height="150" />

      <div class="game-detail__content">
        <header class="game-detail__header">
          <div>
            <p class="game-detail__genre">{{ genreCategoryName }}</p>
            <h1>{{ game.title }}</h1>
          </div>
          <p class="game-detail__rating">{{ averageRating }}</p>
        </header>

        <p class="game-detail__description">{{ game.description }}</p>

        <dl class="game-detail__meta">
          <div>
            <dt>Release date</dt>
            <dd>{{ releaseDate }}</dd>
          </div>
          <div>
            <dt>Developer</dt>
            <dd>{{ developerName }}</dd>
          </div>
          <div>
            <dt>Average rating</dt>
            <dd>{{ averageRating }} <span>({{ ratingsCount }})</span></dd>
          </div>
          <div>
            <dt>Genres</dt>
            <dd>{{ genreCategoryName }}</dd>
          </div>
        </dl>

        <section class="reviews" aria-labelledby="reviews-heading">
          <h2 id="reviews-heading">Reviews</h2>
          <p v-if="!reviews.length" class="reviews__empty">No reviews yet.</p>
          <ul v-else class="reviews__list">
            <li v-for="review in reviews" :key="review.id" class="review">
              <div class="review__header">
                <strong>{{ review.user?.username || 'Unknown user' }}</strong>
                <span>{{ formatReviewRating(review) }}</span>
              </div>
              <p>{{ review.review_text || review.reviewText || 'No review text provided.' }}</p>
            </li>
          </ul>
        </section>
      </div>
    </article>
    <div v-else class="detail-status">Game not found.</div>
  </main>
</template>

<script setup lang="js">
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();

// fetch game
const { data, error, pending } = await useAsyncData(`game-${route.params.id}`, async () => {
  const [gameRes, statsRes] = await Promise.all([
    $fetch(`${config.public.apiBaseUrl}/games/${route.params.id}`),
    $fetch(`${config.public.apiBaseUrl}/games/${route.params.id}/stats`)
  ]);

  return {
    ...gameRes.data,
    average_rating: Number(statsRes.data?.average_rating), // average rating
    total_reviews: Number(statsRes.data?.total_reviews), // total reviews
  };
});

// computed properties :: start
const game = computed(() => data.value);

const featuredImage = computed(() => {
  const images = game.value?.images || [];
  const image = images.find((item) => item.image_type === 'Screenshot' || item.imageType === 'Screenshot') || images[0]; // find screenshot image
  const path = image?.image_url || image?.imageUrl; // get image path

  if (!path) return 'https://placehold.co/1180x664'; // if no image, return placeholder image, 
  return new URL(path, config.public.serverBaseUrl).toString(); // return image url
});

const releaseDate = computed(() => {
  const value = game.value?.release_date || game.value?.releaseDate;
  if (!value) return 'Unknown';

  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(value));
});

const averageRating = computed(() => {
  const rating = Number(game.value?.average_rating || game.value?.averageRating || 0);
  return rating > 0 ? rating.toFixed(1) : 'Unrated';
});

const ratingsCount = computed(() => {
  const count = Number(game.value?.total_reviews || game.value?.ratingsCount || 0);
  return `${count} ${count === 1 ? 'rating' : 'ratings'}`;
});

const genreCategoryName = computed(() => game.value?.genre?.name || 'Unknown genre');
const developerName = computed(() => game.value?.developer?.name || 'Unknown developer');
const reviews = computed(() => game.value?.reviews || []);

const formatReviewRating = (review) => {
  const rating = Number(review?.rating ?? review?.rating_score ?? review?.ratingScore ?? 0);
  return rating > 0 ? rating.toFixed(1) : 'Unrated';
};

const goBack = () => {
  if (window.history.length > 1) {
    router.back();
    return;
  }

  router.push('/');
};
</script>

<style lang="scss" scoped>
.detail-page {
  min-height: 100vh;
  padding: 2rem clamp(1rem, 4vw, 3rem);
  background: #f6f8fb;
}

.detail-status,
.game-detail {
  width: min(1180px, 100%);
  margin: 0 auto;
}

.detail-status {
  padding: 1rem;
  border: 1px solid #d8e0ea;
  background: #fff;

}

.game-detail {
  overflow: hidden;
  border: 1px solid #d8e0ea;
  background: #fff;

  &__image {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    display: block;
  }

  &__content {
    padding: clamp(1rem, 3vw, 2rem);
  }

  &__header {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;

    h1 {
      margin: 0;
      font-size: clamp(1.75rem, 3vw, 2.5rem);
      line-height: 1.1;
    }
  }

  &__genre {
    width: fit-content;
    max-width: 100%;
    margin: 0 0 0.625rem;
    padding: 1rem;
    font-size: 0.75rem;
    font-weight: 700;
    overflow-wrap: anywhere;
  }

  &__rating {
    margin: 0;
    font-size: 2rem;
    font-weight: 800;
    line-height: 1;
  }

  &__description {
    max-width: 70ch;
    margin: 0 0 1.5rem;

    line-height: 1.6;
  }

  &__meta {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
    gap: 1rem;
    margin: 0 0 2rem;

    div {
      padding: 1rem;
      border: 1px solid #d8e0ea;
      background: #f9fbfd;
    }

    dt,
    dd {
      margin: 0;
    }

    dt {
      margin-bottom: 0.35rem;
      color: #667085;
      font-size: 0.8125rem;
      font-weight: 700;
    }

    dd {

      font-weight: 800;
    }

    span {
      color: #667085;
      font-weight: 500;
    }
  }
}

.reviews {
  h2 {
    margin: 0 0 1rem;

    font-size: 1.25rem;
  }

  &__empty {
    margin: 0;

  }

  &__list {
    display: grid;
    gap: 0.875rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }
}

.review {
  padding: 1rem;
  border: 1px solid #d8e0ea;

  &__header {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 0.5rem;

  }

  span {
    color: #1f7a57;
    font-weight: 800;
  }

  p {
    margin: 0;
    line-height: 1.5;
  }
}

@media (max-width: 640px) {

  .game-detail__header,
  .review__header {
    flex-direction: column;
  }
}
</style>
