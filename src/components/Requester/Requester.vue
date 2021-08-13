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

      <v-btn @click="send" large class="ma-2" outlined>
        <v-icon left>mdi-send</v-icon> Send
      </v-btn>
    </v-row>

    <v-row>
      <v-col>
        <Headers :headers="headers" />
        <QueryParams
          @query-string-changed="updateQueryString"
          :queryList="queryList"
        />
      </v-col>
    </v-row>
    headers: {{ headers }} <br />
    queryList: {{ queryList }} <br />
    queryString: {{ queryString }} <br />
    Method: {{ method }} <br />

    <Response :response="response" />
  </div>
</template>

<script>
import axios from 'axios';
import Headers from '@/components/Requester/Headers';
import QueryParams from '@/components/Requester/QueryParams';
import Response from '@/components/Response/Response';

import { getQueryListFromQueryString } from './QueryParamHelper';

const axiosRequest = async ({ method, url, payload, config }) => {
  try {
    const response = await axios[method](url, payload, config);
    return response;
  } catch ({ response }) {
    return response;
  }
};

export default {
  components: { Headers, QueryParams, Response },
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
      console.log('QS Changed', val);
      this.queryList = getQueryListFromQueryString(val);
    },
  },
  methods: {
    updateQueryString(qs) {
      const indexOfQSStart = this.url.indexOf('?');
      if (indexOfQSStart !== -1) {
        this.url = this.url.substring(0, indexOfQSStart);
        this.url += qs;
      }
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
