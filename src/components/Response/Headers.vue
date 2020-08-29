<template>
  <div>
    <v-row no-gutters v-for="(header, index) in headers" :key="index">
      <v-col cols="12" sm="6" class="pa-1">
        <v-text-field
          v-model="header.key"
          dense
          outlined
          hide-details
          :readonly="true"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" class="pa-1">
        <v-text-field
          v-model="header.value"
          dense
          outlined
          hide-details
          :readonly="true"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
