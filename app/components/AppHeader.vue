<template>
  <header class="app-header">
    <NuxtLink class="app-header__brand" to="/">Merkle</NuxtLink>
    <ThemeToggle />
  </header>
</template>

<script setup lang="js">
import ThemeToggle from "@/components/ThemeToggle.vue";
</script>

<style lang="scss" scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 4rem;
  padding: 0 clamp(1rem, 4vw, 3rem);
  border-bottom: 1px solid $color-border-muted;
  background: $color-surface;
}

.app-header__brand {
  color: var(--color-text);
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
}
</style>
