<template>
  <div class="detail-page">
    <div>
      <BackButton @goBack="goBack" />
    </div>
    <div>
      <GameDetails />
    </div>
  </div>
</template>

<script setup lang="js">
const router = useRouter();

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
  padding: 1rem clamp(1rem, 4vw, 3rem);
  min-height: 100vh;
  margin: 0 auto;
}
</style>
