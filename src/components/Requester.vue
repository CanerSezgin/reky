<template>
  <div>
    <v-row class="mt-5">
      <v-card flat class="transparent" width="150">
        <v-select
          v-model="method"
          :items="METHODS"
          item-text="text"
          item-value="value"
          label="Method"
          outlined
          hide-details
        ></v-select>
      </v-card>

      <v-text-field
        v-model="url"
        label="URL"
        aria-autocomplete="off"
        outlined
        hide-details
      ></v-text-field>

      <v-btn large class="ma-2" outlined>
        <v-icon left>mdi-send</v-icon> Send
      </v-btn>
    </v-row>

    <v-row>
      <v-col>
        <Parameters
          @query-string-changed="updateQueryString"
          :params="params"
        />
      </v-col>
    </v-row>
    {{ headers }}
  </div>
</template>

<script>
import axios from "axios";
import Headers from "@/components/Requester/Headers";
import Parameters from "@/components/Requester/Parameters";
export default {
  components: { Headers, Parameters },
  data() {
    return {
      METHODS: [
        { text: "GET", value: "get" },
        { text: "POST", value: "post" },
        { text: "PUT", value: "put" },
        { text: "PATCH", value: "patch" },
        { text: "DELETE", value: "delete" },
        { text: "HEAD", value: "head" },
        { text: "OPTIONS", value: "options" },
      ],

      method: "get",
      url: "www.caner.com?abc=1&def=2",
      headers: [],
      params: [],
    };
  },
  methods: {
    updateQueryString(qs) {
      const indexOfQSStart = this.url.indexOf("?");
      if (indexOfQSStart !== -1) {
        this.url = this.url.substring(0, indexOfQSStart);
        this.url += qs;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
