<template>
  <v-card flat>
    <v-list dense>
      <v-row no-gutters>
        <v-col
          class="px-5"
          xs="12"
          md="6"
          v-for="(data, key, i) in object"
          :key="key"
          :style="i % 2 == 0 ? 'border-right: 2px solid #00897B;' : ''"
        >
          <v-list-item>
            <ObjectData :objKey="key" :objValue="data" />
          </v-list-item>
        </v-col>
      </v-row>
    </v-list>
  </v-card>
</template>

<script>
import ObjectData from "@/components/ObjectData";
export default {
  components: { ObjectData },
  props: {
    object: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
