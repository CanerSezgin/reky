<template>
  <div>
    <v-row class="mt-1">
      <v-card flat class="transparent" width="150">
        <v-select
          v-model="method"
          :items="METHODS"
          item-text="text"
          item-value="value"
          label="Method"
          filled
          hide-details
        ></v-select>
      </v-card>

      <v-text-field
        v-model="url"
        label="URL"
        aria-autocomplete="off"
        filled
        :error-messages="URLError ? 'Invalid URL' : null"
        hide-details
      ></v-text-field>

      <v-btn @click="send" x-large height="56">
        <v-icon left>mdi-send</v-icon> Send
      </v-btn>
    </v-row>

    <v-row class="mt-4">
      <v-col>
        <Tabs
          :tabs="[
            `Parameters &nbsp; ∷ &nbsp;  ${queryList.length}`,
            `Headers &nbsp; ∷ &nbsp;  ${headers.length}`,
            `Body`,
          ]"
        >
          <template v-slot:tab-0
            ><QueryParams
              @query-string-changed="updateQueryString"
              :queryList="queryList"
          /></template>
          <template v-slot:tab-1> <Headers :headers="headers" /> </template>
          <template v-slot:tab-2> <BodyEditor /> </template>
        </Tabs>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <Response :response="response" />
  </div>
</template>

<script>
import { axiosRequest } from '@/utils/axios';
import Headers from '@/components/Requester/Headers';
import QueryParams from '@/components/Requester/QueryParams';
import Response from '@/components/Response/Response';
import Tabs from '@/components/Tabs';
import BodyEditor from '@/components/Requester/BodyEditor';

import { getQueryListFromQueryString } from './QueryParamHelper';

export default {
  components: { Headers, QueryParams, Response, Tabs, BodyEditor },
  data() {
    return {
      URLError: true,
      METHODS: [
        { text: 'GET', value: 'get' },
        { text: 'POST', value: 'post' },
        { text: 'PUT', value: 'put' },
        { text: 'PATCH', value: 'patch' },
        { text: 'DELETE', value: 'delete' },
        { text: 'HEAD', value: 'head' },
        { text: 'OPTIONS', value: 'options' },
      ],

      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/posts',
      headers: [],
      queryList: [],
      response: null,
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

      const indexOfQSStart = this.url.indexOf('?');
      if (indexOfQSStart === -1) return '';
      return this.url.substring(indexOfQSStart);
    },
  },
  watch: {
    queryString(val) {
      this.queryList = getQueryListFromQueryString(val);
    },
  },
  methods: {
    updateQueryString(qs) {
      const indexOfQSStart = this.url.indexOf('?');
      if (indexOfQSStart !== -1) {
        this.url = this.url.substring(0, indexOfQSStart);
      }
      this.url += qs;
    },
    async send() {
      const response = await axiosRequest({
        method: this.method,
        url: this.url,
        config: {},
      });
      this.response = response;
      console.log(this.response);
    },
  },
};
</script>

<style lang="scss" scoped></style>
