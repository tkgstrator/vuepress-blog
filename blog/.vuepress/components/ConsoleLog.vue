<template>
  <div>
    <script>console.log("{{ message }}")</script>
  </div>
</template>

<script>
export default {
  name: "ConsoleLog",
  data() {
    return {
      message: "Hello, World!"
    };
  },
};
</script>

<style>
</style>