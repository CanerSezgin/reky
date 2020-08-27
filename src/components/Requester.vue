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
        :error-messages="URLError ? 'Invalid URL' : null"
      ></v-text-field>

      <v-btn large class="ma-2" outlined>
        <v-icon left>mdi-send</v-icon> Send
      </v-btn>
    </v-row>

    <v-row>
      <v-col>
        <Parameters
          @query-string-changed="updateQueryString"
          :queryList="queryList"
        />
      </v-col>
    </v-row>
    {{ headers }}
    {{ queryString }}
  </div>
</template>

<script>
import axios from "axios";
import Headers from "@/components/Requester/Headers";
import Parameters from "@/components/Requester/Parameters";

const getQueryListFromQueryString = (qs) => {
  if (!qs || qs[0] !== "?") return [];
  const questionMarkedRemoved = qs.substring(1);
  return questionMarkedRemoved.split("&").map((query) => {
    const [key = "", value = ""] = query.split("=");
    return { key, value };
  });
};

export default {
  components: { Headers, Parameters },
  data() {
    return {
      URLError: true,
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
      queryList: [],
    };
  },
  computed: {
    urlComponents() {
      try {
        this.URLError = false;
        return new URL(this.url);
      } catch (error) {
        this.URLError = true;
        return null;
      }
    },
    queryString() {
      if (this.urlComponents) {
        return this.urlComponents.search;
      }

      const indexOfQSStart = this.url.indexOf("?");
      if (indexOfQSStart === -1) return "";
      return this.url.substring(indexOfQSStart);
    },
  },
  watch: {
    queryString(val) {
      console.log("QS Changed", val);
      this.queryList = getQueryListFromQueryString(val);
    },
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
