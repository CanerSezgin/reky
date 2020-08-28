<template>
  <div>
    <v-card>
      <v-card-title>{{ listName }} ({{ validList.length }})</v-card-title>
      <v-row no-gutters v-for="(param, index) in list" :key="index">
        <v-col cols="12" sm="6" class="pa-1">
          <v-text-field
            v-model="param.key"
            :label="`${keyLabel} ${index + 1}`"
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
          <v-btn icon @click="deleteEl(index)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
    <div class="text-right">
      <v-btn @click="addNewEl" text>Add New</v-btn>
    </div>
    list {{ list }} <br />
    {{ validList }}
  </div>
</template>

<script>
export default {
  props: {
    listName: {
      type: String,
      required: true,
    },
    list: {
      type: Array,
      required: true,
    },
    keyLabel: {
      type: String,
      required: true,
    },
  },
  computed: {
    validList() {
      return this.list.filter((param) => param.key && param.value);
    },
  },
  watch: {
    validList(val) {
      this.$emit("valid-list-changed", val);
    },
  },
  methods: {
    addNewEl() {
      this.list.push({ key: "", value: "" });
    },
    deleteEl(index) {
      this.list.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped></style>
