<template>
  <v-list>
    <v-list-item v-for="(e, key) in error" :key="key">
      <v-layout row wrap>
        <v-flex xs4>
          <v-list-item-title>
            <v-icon class="px-3 error--text">error_outline</v-icon>
            {{ key }}
          </v-list-item-title>
        </v-flex>
        <v-flex xs8>
          <v-list-item-title v-text="e"></v-list-item-title>
        </v-flex>
      </v-layout>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: ["error"],
};
</script>
