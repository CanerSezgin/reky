<template>
  <div>
    {{ dataType }} <br />
    {{ json }}

    <!-- <ManyData
      v-if="this.headers.length > 0"
      :headers="headers"
      :body="body"
      :screenWidth="screenWidth"
    /> -->

    <SingleData v-if="isObject" :object="json" />
  </div>
</template>

<script>
import ManyData from "@/components/ManyData";
import SingleData from "@/components/SingleData";
export default {
  components: { ManyData, SingleData },
  props: {
    json: {
      required: false,
    },
  },
  computed: {
    isObject() {
      return this.dataType === "object";
    },
    dataType() {
      if (typeof this.json === "object" && !Array.isArray(this.json)) {
        return "object";
      } else if (typeof this.json === "object" && Array.isArray(this.json)) {
        return "array";
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
