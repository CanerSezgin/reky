<template>
  <div>
    Response

    <div v-if="response">
      <v-tabs fixed-tabs background-color="indigo" dark v-model="tab" ani>
        <v-tab>
          Body
        </v-tab>
        <v-tab> Headers ({{ headers.length }}) </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <Body :body="response.data" :responseType="responseType" />
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
import Body from "@/components/Response/Body";
export default {
  components: { Headers, Body },
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
    responseType() {
      const contentType = this.response.headers["content-type"];

      if (contentType.includes("json")) return "json";
      else if (contentType.includes("html")) return "html";
      else "";
    },
  },
};
</script>

<style lang="scss" scoped></style>
