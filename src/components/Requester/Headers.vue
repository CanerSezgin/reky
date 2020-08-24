<template>
  <div>
    <v-card>
      <v-card-title>Headers ({{ validHeaders.length }})</v-card-title>
      <v-row no-gutters v-for="(header, index) in headers" :key="index">
        <v-col cols="12" sm="6" class="pa-1">
          <v-text-field
            v-model="header.key"
            :label="`Header ${index + 1}`"
            aria-autocomplete="off"
            dense
            outlined
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="5" class="pa-1">
          <v-text-field
            v-model="header.value"
            :label="`Value ${index + 1}`"
            aria-autocomplete="off"
            dense
            outlined
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="1" class="text-center pa-1">
          <v-btn icon @click="deleteHeader(index)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
    <div class="text-right">
      <v-btn @click="addNewHeader" text>Add New</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headers: Array,
  },
  computed: {
    validHeaders() {
      return this.headers.filter((header) => header.key && header.value);
    },
  },
  methods: {
    addNewHeader() {
      this.headers.push({ key: "", value: "" });
    },
    deleteHeader(index) {
      this.headers.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped></style>
