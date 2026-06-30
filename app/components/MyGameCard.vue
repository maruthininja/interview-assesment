<template>
    <NuxtLink class="game-card" :to="`/games/${game?.id}`">
        <img class="game-card__image" :src="imageSrc" :alt="game?.title" width="300" height="169" loading="lazy" />
        <div class="game-card__content">
            <p class="game-card__genre">{{ genreName }}</p>
            <h2 class="game-card__title">{{ game?.title }}</h2>
            <dl class="game-card__meta">
                <div>
                    <dt>Release date</dt>
                    <dd>{{ releaseDate }}</dd>
                </div>
                <div>
                    <dt>Average rating</dt>
                    <dd>{{ averageRating }} <span>({{ ratingsCount }})</span></dd>
                </div>
            </dl>
        </div>
    </NuxtLink>
</template>

<script setup lang="js">
const props = defineProps(['game'])
const config = useRuntimeConfig()

const imageSrc = computed(() => {
    const path = props.game?.images?.[0]?.image_url || props.game?.images?.[0]?.imageUrl
    if (!path) return 'https://placehold.co/300x169'
    return new URL(path, config.public.serverBaseUrl).toString()
})

const releaseDate = computed(() => {
    const value = props.game?.release_date || props.game?.releaseDate
    if (!value) return 'Unknown'

    return new Intl.DateTimeFormat('en', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }).format(new Date(value))
})

const averageRating = computed(() => {
    const rating = Number(props.game?.average_rating || props.game?.averageRating || 0)
    return rating > 0 ? rating.toFixed(1) : 'Unrated'
})

const ratingsCount = computed(() => {
    const count = Number(props.game?.total_reviews || props.game?.ratingsCount || 0)
    return `${count} ${count === 1 ? 'rating' : 'ratings'}`
})

const genreName = computed(() => props.game?.genre?.name || 'Unknown genre')
</script>

<style lang="scss" scoped>
.game-card {
    border: 1px solid gray;
    overflow: hidden; // clips image to rounded corners
    background: #fff;
    color: inherit;
    display: flex;
    flex-direction: column;
    min-width: 0;
    height: 100%;
    text-decoration: none;
    transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;

    &:hover,
    &:focus-visible {
        border-color: #1f7a57;
        transform: translateY(-2px);
    }

    &:focus-visible {
        outline: 3px solid rgb(66 184 131 / 30%);
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

        div {
            display: flex;
            justify-content: space-between;
            gap: 0.75rem;
        }

        dt,
        dd {
            margin: 0;
        }

        dt {
            color: #667085;
            font-size: 0.8125rem;
        }

        dd {
            text-align: right;
            font-size: 0.875rem;
            font-weight: 700;
        }

        span {
            color: #667085;
            font-weight: 500;
        }
    }
}
</style>
