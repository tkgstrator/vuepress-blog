<template>
  <div>
    <script>console.log("{{ $page.frontmatter.message }}")</script>
  </div>
</template>

<script>
export default {
  name: "ConsoleLog",
  data() {
    return {
    };
  },
};
</script>

<style>
</style>