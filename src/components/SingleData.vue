<template>
  <v-card flat class="singleData">
    <v-row no-gutters class="mt-2">
      <v-col
        class="px-5"
        xs="12"
        md="6"
        v-for="(data, key, i) in object"
        :key="key"
        :style="i % 2 == 0 ? 'border-right: 2px solid #00897B;' : ''"
      >
        <div class="ml-3 mb-1">
          <ObjectData :objKey="key" :objValue="data" />
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import ObjectData from '@/components/ObjectData';
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
