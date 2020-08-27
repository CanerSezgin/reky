<template>
  <div>
    <v-card>
      <v-card-title>queryList ({{ validQueryList.length }})</v-card-title>
      <v-row no-gutters v-for="(param, index) in queryList" :key="index">
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
    {{ queryList }} <br />
    {{ validQueryList }}
  </div>
</template>

<script>
// TODO: fix 2 way data bind
const getQueryStringFromQueryList = (queryList) => {
  if (!queryList.length) return "";
  const queryListCopy = JSON.parse(JSON.stringify(queryList));
  const firstParam = queryListCopy.shift();
  return (
    `?${firstParam.key}=${firstParam.value}` +
    queryListCopy.reduce(
      (str, param) => str + `&${param.key}=${param.value}`,
      ""
    )
  );
};

export default {
  props: {
    queryList: Array,
  },
  computed: {
    validQueryList() {
      return this.queryList.filter((param) => param.key && param.value);
    },
  },
  watch: {
    validQueryList() {
      const queryString = getQueryStringFromQueryList(this.queryList);
      console.log({ queryString });
      if (queryString) this.$emit("query-string-changed", queryString);
    },
  },
  methods: {
    addNewParam() {
      this.queryList.push({ key: "", value: "" });
    },
    deleteParam(index) {
      this.queryList.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped></style>
