<template>
  <div>
    Response

    <div v-if="response">
      <template>
        <v-tabs fixed-tabs background-color="indigo" dark v-model="tab" ani>
          <v-tab>
            Visualized
          </v-tab>
          <v-tab>
            Body
          </v-tab>
          <v-tab> Headers ({{ headers.length }}) </v-tab>
        </v-tabs>
      </template>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <Visualized :json="response.data" />
        </v-tab-item>
        <v-tab-item>
          <Body :body="response.data" />
        </v-tab-item>
        <v-tab-item>
          <Headers :headers="headers" />
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import Headers from "@/components/Response/Headers";
import Visualized from "@/components/Response/Visualized";
import Body from "@/components/Response/Body";
export default {
  components: { Headers, Visualized, Body },
  props: {
    response: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      tab: "",
    };
  },
  computed: {
    headers() {
      const entries = Object.entries(this.response.headers);
      return entries.map((entry) => ({ key: entry[0], value: entry[1] }));
    },
  },
};
</script>

<style lang="scss" scoped></style>
