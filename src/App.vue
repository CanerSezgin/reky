<template>
  <v-app>
    <v-content class="mx-5">
      <router-view/>
    </v-content>
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

<style>
.longtext {
    word-wrap: break-word;
}
</style>

