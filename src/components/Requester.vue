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
        <Headers :headers="headers" />
      </v-col>
    </v-row>
    {{ headers }}
  </div>
</template>

<script>
import axios from "axios";
import Headers from "@/components/Requester/Headers";
export default {
  components: { Headers },
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
      url: "",
      headers: [{ key: "Authorization", value: "asasdafd" }],
      params: {},
    };
  },
};
</script>

<style lang="scss" scoped></style>
