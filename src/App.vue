<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  }),
};
</script>

<style>
.longtext {
  word-wrap: break-word;
}
.special {
  font-weight: 500;
  color: brown;
}
.pointer {
  cursor: pointer;
}
</style>
