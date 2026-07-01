<template>
    <NuxtLink class="game-card" :to="`/games/${game?.id}`">
        <img class="game-card__image" :src="imageSrc" :alt="game?.title" width="300" height="169" loading="lazy" />
        <div class="game-card__content">
            <p class="game-card__genre">{{ game.genre.name }}</p>
            <h2 class="game-card__title">{{ game?.title }}</h2>
            <dl class="game-card__meta">
                <div class="game-card__meta-row">
                    <dt class="game-card__meta-label">Release date</dt>
                    <dd class="game-card__meta-value">{{ game.release_date }}</dd>
                </div>
                <div class="game-card__meta-row">
                    <dt class="game-card__meta-label">Average rating</dt>
                    <dd class="game-card__meta-value">
                        {{ Math.round(game.average_rating) }}
                        <span class="game-card__ratings-count">({{ game.total_reviews }} Reviews)</span>
                    </dd>
                </div>
            </dl>
        </div>
    </NuxtLink>
</template>

<script setup lang="js">
import { formattedGameImageUrl } from '@/utils/game_utils'

const props = defineProps(['game'])
const config = useRuntimeConfig()

const imageSrc = computed(() => formattedGameImageUrl(props.game, { baseUrl: config.public.serverBaseUrl }))
</script>

<style lang="scss" scoped>
.game-card {
    border: 1px solid $color-border;
    border-radius: 8px;
    overflow: hidden; // clips image to rounded corners
    background: $color-surface;
    color: inherit;
    display: flex;
    flex-direction: column;
    min-width: 0;
    height: 100%;
    text-decoration: none;
    transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;

    &:hover,
    &:focus-visible {
        border-color: $color-primary;
        transform: translateY(-2px);
    }

    &:focus-visible {
        outline: 3px solid $color-primary-focus;
        outline-offset: 3px;
    }

    &__image {
        width: 100%; // fill card width
        aspect-ratio: 16 / 9; // consistent image height
        object-fit: cover; // crop without stretching
        display: block; // removes gap under image
    }

    &__content {
        display: flex;
        flex: 1;
        flex-direction: column;
        padding: 0.875rem;
    }

    &__genre {
        width: fit-content;
        max-width: 100%;
        margin: 0 0 0.625rem;
        padding: 0.25rem 0.5rem;
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: 700;
        overflow-wrap: anywhere;
    }

    &__title {
        margin: 0;
        font-size: 1.05rem;
        line-height: 1.25;
    }

    &__meta {
        display: grid;
        gap: 0.625rem;
        margin: auto 0 0;
        padding: 1rem 0 0;
    }

    &__meta-row {
        display: flex;
        justify-content: space-between;
        gap: 0.75rem;
    }

    &__meta-label,
    &__meta-value {
        margin: 0;
    }

    &__meta-label {
        color: $color-secondary;
        font-size: 0.8125rem;
    }

    &__meta-value {
        text-align: right;
        font-size: 0.875rem;
        font-weight: 700;
    }

    &__ratings-count {
        color: $color-secondary;
        font-weight: 500;
    }
}
</style>
