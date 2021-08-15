<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
.v-application {
  [class*='text-'] {
    font-family: Tahoma, Verdana, Segoe, sans-serif !important;
  }
  font-family: Tahoma, Verdana, Segoe, sans-serif !important;
}
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
.bold {
  font-family: Roboto, Times, serif;
  font-weight: 600;
}
</style>
