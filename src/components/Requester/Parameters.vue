<template>
  <div>
    <v-card>
      <v-card-title>params ({{ validParams.length }})</v-card-title>
      <v-row no-gutters v-for="(param, index) in params" :key="index">
        <v-col cols="12" sm="6" class="pa-1">
          <v-text-field
            v-model="param.key"
            :label="`Parameter ${index + 1}`"
            aria-autocomplete="off"
            dense
            outlined
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="5" class="pa-1">
          <v-text-field
            v-model="param.value"
            :label="`Value ${index + 1}`"
            aria-autocomplete="off"
            dense
            outlined
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="1" class="text-center pa-1">
          <v-btn icon @click="deleteParam(index)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
    <div class="text-right">
      <v-btn @click="addNewParam" text>Add New</v-btn>
    </div>
  </div>
</template>

<script>
const getQueryString = (params) => {
  if (!params.length) return "";
  const paramsCopy = JSON.parse(JSON.stringify(params));
  const firstParam = paramsCopy.shift();
  return (
    `?${firstParam.key}=${firstParam.value}` +
    paramsCopy.reduce((str, param) => str + `&${param.key}=${param.value}`, "")
  );
};
export default {
  props: {
    params: Array,
  },
  computed: {
    validParams() {
      return this.params.filter((param) => param.key && param.value);
    },
  },
  watch: {
    validParams() {
      const queryString = getQueryString(this.validParams);
      console.log({ queryString });
      if (queryString) this.$emit("query-string-changed", queryString);
    },
  },
  methods: {
    addNewParam() {
      this.params.push({ key: "", value: "" });
    },
    deleteParam(index) {
      this.params.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped></style>
