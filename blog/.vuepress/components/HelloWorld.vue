<template>
  <p class="color-red">{{ message }}</p>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      message: "Hello, World!",
    };
  },
};
</script>

<style>
.color-red {
  color: red;
}
</style>