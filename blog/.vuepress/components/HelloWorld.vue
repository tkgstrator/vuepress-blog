<template>
  <p class="color-red">{{ $page.frontmatter.message }}</p>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {};
  },
};
</script>

<style>
.color-red {
  color: red;
}
</style>