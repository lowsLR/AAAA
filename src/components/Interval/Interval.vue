<template>
  <div class="interval">
    <div></div>
  </div>
</template>

<script>
export default {
  name: "Interval"
};
</script>

<style lang="scss" scoped>
.interval {
  > div {
    width: 100%;
    height: 0.1rem;
    background-color: bbcolor(0.1);
  }
}
</style>