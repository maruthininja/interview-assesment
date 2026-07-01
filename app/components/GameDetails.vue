<template>
    <div class="game-detail-container">
        <div v-if="pending" class="detail-status">Loading game...</div>
        <div v-else-if="error" class="detail-status">Error: {{ error.message }}</div>
        <div v-else-if="game" class="game-detail">
            <img class="game-detail__image" :src="imageSrc" :alt="game.title" width="150" height="150" />
            <div class="game-detail__content">
                <header class="game-detail__header">
                    <div class="game-detail__heading">
                        <p class="game-detail__genre">{{ game?.genre?.name || 'Unknown genre' }}</p>
                        <h1 class="game-detail__title">{{ game.title }}</h1>
                    </div>
                    <p class="game-detail__rating">{{ Math.round(Number(game?.average_rating || 0)) || 'Unrated' }}</p>
                </header>

                <p class="game-detail__description">{{ game.description }}</p>

                <dl class="game-detail__meta">
                    <div class="game-detail__meta-row">
                        <dt class="game-detail__meta-label">Release date</dt>
                        <dd class="game-detail__meta-value">{{ game?.release_date || 'Unknown' }}</dd>
                    </div>
                    <div class="game-detail__meta-row">
                        <dt class="game-detail__meta-label">Developer</dt>
                        <dd class="game-detail__meta-value">{{ developerName }}</dd>
                    </div>
                    <div class="game-detail__meta-row">
                        <dt class="game-detail__meta-label">Average rating</dt>
                        <dd class="game-detail__meta-value">
                            {{ Math.round(Number(game?.average_rating || 0)) || 'Unrated' }}
                            <span class="game-detail__ratings-count">({{ game?.total_reviews || 0 }} Reviews)</span>
                        </dd>
                    </div>
                    <div class="game-detail__meta-row">
                        <dt class="game-detail__meta-label">Genres</dt>
                        <dd class="game-detail__meta-value">{{ game?.genre?.name || 'Unknown genre' }}</dd>
                    </div>
                </dl>

                <section class="reviews" aria-labelledby="reviews-heading">
                    <h2 id="reviews-heading" class="reviews__title">Reviews</h2>
                    <p v-if="!reviews.length" class="reviews__empty">No reviews yet.</p>
                    <ul v-else class="reviews__list">
                        <li v-for="review in reviews" :key="review.id" class="review">
                            <div class="review__header">
                                <strong class="review__author">{{ review.user?.username || 'Unknown user' }}</strong>
                                <span class="review__rating">{{ review.rating ?? review.rating_score ?? review.ratingScore ?? 'Unrated' }}</span>
                            </div>
                            <p class="review__text">{{ review.review_text || review.reviewText || 'No review text provided.' }}</p>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
        <div v-else class="detail-status">Game not found.</div>
    </div>
</template>

<script setup lang="js">
import { formattedGameImageUrl } from '@/utils/game_utils'

const config = useRuntimeConfig()
const route = useRoute();

const { data, error, pending } = await useAsyncData(`game-${route.params.id}`, async () => {

    // make api call to get game details and stats
    const [gameRes, statsRes] = await Promise.all([
        $fetch(`${config.public.apiBaseUrl}/games/${route.params.id}`), // api call to get game details
        $fetch(`${config.public.apiBaseUrl}/games/${route.params.id}/stats`) // api call to get game stats
    ]); // wait for both api calls to complete

    return { // return game details and stats
        ...gameRes.data,
        average_rating: Number(statsRes.data?.average_rating), // cohersion to number for safety in case
        total_reviews: Number(statsRes.data?.total_reviews), // cohersion to number for safety in case
    };
});

const game = computed(() => data.value);

const imageSrc = computed(() => formattedGameImageUrl(game.value, { baseUrl: config.public.serverBaseUrl }))

const developerName = computed(() => game.value?.developer?.name || 'Unknown developer')

const reviews = computed(() => Array.isArray(game.value?.reviews) ? game.value.reviews : [])
</script>


<style lang="scss" scoped>
.game-detail-container {
    margin: 0 auto;
}

.detail-status {
    padding: 1rem;
}

.game-detail {
    display: grid;
    gap: 1.5rem;

    &__image {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        display: block;
    }

    &__content {
        display: grid;
        gap: 1.25rem;
    }

    &__header {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
    }

    &__heading {
        min-width: 0;
    }

    &__genre {
        margin: 0 0 0.5rem;
        color: $color-secondary;
        font-size: 0.875rem;
        font-weight: 700;
    }

    &__title {
        margin: 0;
        font-size: 1.75rem;
        line-height: 1.2;
    }

    &__rating {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 700;
    }

    &__description {
        margin: 0;
        line-height: 1.6;
    }

    &__meta {
        display: grid;
        gap: 0.75rem;
        margin: 0;
        padding: 0;
    }

    &__meta-row {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
    }

    &__meta-label,
    &__meta-value {
        margin: 0;
    }

    &__meta-label {
        color: $color-secondary;
        font-size: 0.875rem;
    }

    &__meta-value {
        text-align: right;
        font-weight: 700;
    }

    &__ratings-count {
        color: $color-secondary;
        font-weight: 500;
    }
}

.reviews {
    display: grid;
    gap: 0.875rem;

    &__title {
        margin: 0;
        font-size: 1.25rem;
    }

    &__empty {
        margin: 0;
        color: $color-secondary;
    }

    &__list {
        display: grid;
        gap: 0.75rem;
        margin: 0;
        padding: 0;
        list-style: none;
    }
}

.review {
    display: grid;
    gap: 0.5rem;
    padding: 0.875rem;
    border: 1px solid $color-border;

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }

    &__author {
        min-width: 0;
    }

    &__rating {
        font-weight: 700;
    }

    &__text {
        margin: 0;
        line-height: 1.5;
    }
}
</style>
