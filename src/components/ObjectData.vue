<template>
  <v-layout row wrap class="objectData">
    <v-flex xs4>
      <div class="objKey" v-text="objKey"></div>
    </v-flex>
    <v-flex xs8>
      <div
        v-if="typeof objValue !== 'object'"
        class="subtitle-2 font-weight-light longtext"
      >
        <v-img
          v-if="isValidImgURL(objValue)"
          :src="objValue"
          height="100"
          contain
          class="mb-2"
        ></v-img>
        <div class="objValue">{{ objValue }}</div>
      </div>
      <div v-else class="mt-4">
        <object-data
          v-for="(v, k) in objValue"
          :key="k"
          :objKey="k"
          :objValue="v"
        />
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { isValidImgURL } from '@/utils/url';
export default {
  name: 'object-data',
  props: ['objKey', 'objValue'],
  methods: {
    isValidImgURL,
  },
};
</script>
<style lang="scss" scoped>
.objValue {
  font-size: 14px;
}
.objKey {
  font-size: 14.5px;
}
</style>
