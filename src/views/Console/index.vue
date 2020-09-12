<template>
  <div>
    <LayoutNav />
    <LayoutHeader />
    <LayoutContent />
  </div>
</template>

<script>
import LayoutHeader from "./Layout/LayoutHeader.vue";
import LayoutNav from "./Layout/LayoutNav.vue";
import LayoutContent from "./Layout/LayoutContent.vue";
export default {
  name: "Console",
  data() {
    return {};
  },
  components: { LayoutHeader, LayoutNav, LayoutContent }
};
</script>
<style lang="scss" scoped>
</style>