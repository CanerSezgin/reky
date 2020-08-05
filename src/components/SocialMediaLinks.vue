<template>
  <v-card class="elevation-4 pa-5">
    <h5>Follow me on</h5>

    <v-layout row wrap class="px-2">
      <v-flex xs4 class="px-1" v-for="link in socialLinks" :key="link.url">
        <a :href="link.url" target="_blank"
          ><v-img :src="require('@/assets/social/' + link.img)"
        /></a>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      socialLinks: [
        { url: "https://github.com/CanerSezgin", img: "github.png" },
        {
          url: "https://www.linkedin.com/in/canersezgin/",
          img: "linkedin.jpg",
        },
        { url: "https://twitter.com/ccanersezgin", img: "twitter.jpg" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
