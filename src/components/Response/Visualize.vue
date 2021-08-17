<template>
  <div style="max-height: 700px; overflow-y: auto">
    <div v-if="json">
      <ManyData v-if="isArray" :array="json" :screenWidth="600" />

      <SingleData v-if="isObject" :object="json" />
    </div>
    <div v-if="html">
      <div v-html="body"></div>
    </div>
  </div>
</template>

<script>
import ManyData from '@/components/ManyData';
import SingleData from '@/components/SingleData';
export default {
  components: { ManyData, SingleData },
  props: {
    body: {
      required: false,
    },
    responseType: {
      type: String,
      required: true,
    },
  },
  computed: {
    json() {
      return this.responseType === 'json' ? this.body : null;
    },
    html() {
      return this.responseType === 'html' ? this.body : null;
    },
    isObject() {
      return this.dataType === 'object';
    },
    isArray() {
      return this.dataType === 'array';
    },
    dataType() {
      if (typeof this.json === 'object' && !Array.isArray(this.json)) {
        return 'object';
      } else if (typeof this.json === 'object' && Array.isArray(this.json)) {
        return 'array';
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
