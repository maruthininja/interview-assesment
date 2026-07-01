# NUXTJS Interview Assessment

## Project Structure

```text
app/
  assets/styles/
    _variables.scss  
    global.scss
  components/
    BackButton.vue
    GameCard.vue
    GameDetails.vue
  composables/
    useGames.js
  pages/
    index.vue
    games/[id].vue
  utils/
    game_utils.js
```

## What I Included in the Assessment

- Game listing page at `/`
  - Lists 15 random games between 2015 - 17,
  - Default sorting option i kept by rating (I filtered in client side only)
  - When we change the sorting option to release data (I filtering the game in client side only)
  - I used useAsyncData with 'landing-games' as key to cache data
  - API fetching through `useAsyncData` and `useGames` [Composable], The page stores the combined game data in Nuxt async data
  - I have built a function named sample which is used to get random 15 game ids

- Game detail page at `/games/:id`
  - I have built a new Game Detail Component to keep things clean
  - In both Game List and Game Detail I used fallback image function utility


## Image Fallback

Image selection is handled by `formattedGameImageUrl()` in:

```text
app/utils/game_utils.js
```

It picks a screenshot first, falls back to the first image, and then falls back to a placeholder image if no image exists.

## General Stuff
- I used JS instead of TS but in interview i can convert to TS on the fly if required
- BEM-style component with SCSS color variables, SCSS breakpoint variables and used Poppins font for great looking, And used nuxt/image module only and nothing else
- Global Poppins font from Google Fonts , Injected cdn font links in nuxt.config.ts

## Tech Stack

- Nuxt 4 [We have Nuxt5 Nightly but i sticked with Nuxt4 since its stable for now]
- Vue 3 + Composition API + Script Setup 
- SCSS with variables used instead of CSS, As mentioned in task description 
- Nuxt Image [Used less attributes from this module, we can discuss more]

## Setup & Commands

Create a local `.env`and copy the contents from `.env.example` but when you were testing make sure to adjust the base urls 

```bash
NUXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
NUXT_PUBLIC_SERVER_BASE_URL=http://localhost:8000
```

Install Dependencies:
```bash
npm install 
```

Run development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```
