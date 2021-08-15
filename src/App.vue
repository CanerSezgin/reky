<template>
  <v-app id="inspire">
    <v-app-bar app clipped-right flat height="72">
      reky.io
      <v-spacer></v-spacer>

      <v-responsive max-width="156">
        buttons
      </v-responsive>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app width="55">
      <v-navigation-drawer
        v-model="drawer"
        absolute
        color="grey lighten-3"
        mini-variant
      >
        <v-avatar
          class="d-block text-center mx-auto mt-4"
          color="grey darken-1"
          size="36"
        ></v-avatar>

        <v-divider class="mx-3 my-5"></v-divider>

        <v-avatar
          v-for="n in 6"
          :key="n"
          class="d-block text-center mx-auto mb-9"
          color="grey lighten-1"
          size="28"
        ></v-avatar>
      </v-navigation-drawer>
    </v-navigation-drawer>

    <v-navigation-drawer app clipped right width="450">
      <RightMenu />
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import RightMenu from '@/components/frame/RightMenu';
export default {
  name: 'App',
  components: { RightMenu },
  data: () => ({ drawer: null }),
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
