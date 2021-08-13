<template>
  <div>
    <ManyData v-if="isArray" :array="json" :screenWidth="600" />

    <SingleData v-if="isObject" :object="json" />
  </div>
</template>

<script>
import ManyData from '@/components/ManyData';
import SingleData from '@/components/SingleData';
export default {
  components: { ManyData, SingleData },
  props: {
    json: {
      required: false,
    },
  },
  computed: {
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
