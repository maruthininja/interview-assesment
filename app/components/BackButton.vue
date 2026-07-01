<template>
    <button class="back-button" type="button" @click="goBack"> Back</button>
</template>

<script setup lang="js">
const emit = defineEmits(['goBack']);

const goBack = () => { emit('goBack') }
</script>

<style lang="scss" scoped>
.back-button {
    background: none;
    cursor: pointer;
    border-radius: 0.25rem;
    border: 1px solid $color-border;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
}
</style>
