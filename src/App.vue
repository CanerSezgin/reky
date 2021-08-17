<template>
  <v-app id="inspire">
    <v-app-bar app clipped-right flat height="72">
      <div class="mx-5 text-center">
        <div @click="newRequest()" class="logo">
          REKY
        </div>
        <div class="caption" style="line-height: 0.9rem">
          <div>Open Source API</div>
          <div>Development Environment</div>
        </div>
      </div>
      <GithubButton
        class="mt-1 mx-4"
        href="https://github.com/CanerSezgin/reky"
        data-size="large"
        aria-label="Star CanerSezgin/reky on GitHub"
        >Star</GithubButton
      >
      <v-spacer></v-spacer>

      <v-responsive max-width="156">
        <v-btn
          v-for="(button, index) in buttons"
          :key="index"
          class="mx-1"
          icon
          x-large
          @click="goTo(button.link)"
          ><v-icon>{{ button.icon }}</v-icon></v-btn
        >
      </v-responsive>
    </v-app-bar>

    <!-- <v-navigation-drawer app width="55">
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
    </v-navigation-drawer> -->

    <v-navigation-drawer app clipped right width="450">
      <RightMenu />
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import GithubButton from 'vue-github-button';
import RightMenu from '@/components/frame/RightMenu';

export default {
  name: 'App',
  components: { GithubButton, RightMenu },
  data() {
    return {
      buttons: [
        {
          title: 'Github',
          icon: 'mdi-github',
          link: 'https://github.com/CanerSezgin/reky',
        },
        {
          title: 'Twitter',
          icon: 'mdi-twitter',
          link:
            'https://twitter.com/intent/tweet?text=Reky is an open source API development environment. It automatically visualizes API response with outstanding graphs. 🚀🚀 reky.org&hashtags=reky,api,devtools',
        },
      ],
    };
  },
  methods: {
    goTo(url) {
      window.open(url, '_blank');
    },
  },
};
</script>

<style lang="scss" scoped>
.logo {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.75rem;
  cursor: pointer;
}
.logo:hover {
  color: #00bcd4;
}
</style>

<style lang="scss">
.v-application {
  [class*='text-'] {
    font-family: Tahoma, Verdana, Segoe, sans-serif;
  }
  font-family: Tahoma, Verdana, Segoe, sans-serif;
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
