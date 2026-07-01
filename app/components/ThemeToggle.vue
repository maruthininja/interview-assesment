<template>
  <button
    class="theme-toggle"
    type="button"
    :aria-label="isDarkTheme ? 'Switch to light theme' : 'Switch to dark theme'"
    :title="isDarkTheme ? 'Light theme' : 'Dark theme'"
    @click="toggleTheme"
  >
    {{ isDarkTheme ? "White" : "Dark" }}
  </button>
</template>

<script setup lang="js">
const isDarkTheme = ref(false);

const applyTheme = (value) => {
  isDarkTheme.value = value;
  document.documentElement.classList.toggle("theme-dark", value);
  localStorage.setItem("theme", value ? "dark" : "light");
};

const toggleTheme = () => {
  applyTheme(!isDarkTheme.value);
};

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  applyTheme(savedTheme ? savedTheme === "dark" : prefersDark);
});
</script>

<style lang="scss" scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 4.5rem;
  height: 2.5rem;
  padding: 0 0.875rem;
  border: 1px solid $color-border-control;
  border-radius: 6px;
  background: $color-surface;
  color: $color-secondary;
  cursor: pointer;
  font: inherit;
  font-size: 0.875rem;
  font-weight: 700;
  transition: border-color 160ms ease, color 160ms ease, background 160ms ease;

  &:hover,
  &:focus-visible {
    border-color: $color-primary;
    color: $color-primary;
  }

  &:focus-visible {
    outline: 3px solid $color-primary-focus;
    outline-offset: 3px;
  }
}
</style>
