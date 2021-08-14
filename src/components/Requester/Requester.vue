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
      <v-col class="px-0">
        <Tabs
          :tabs="[
            `Parameters &nbsp; ¨ ${queryList.length}`,
            `Headers &nbsp; ¨ ${headers.length}`,
          ]"
        >
          <template v-slot:tab-0
            ><QueryParams
              @query-string-changed="updateQueryString"
              :queryList="queryList"
          /></template>
          <template v-slot:tab-1> <Headers :headers="headers" /> </template>
        </Tabs>
      </v-col>
    </v-row>

    <Response :response="response" />
  </div>
</template>

<script>
import { axiosRequest } from '@/utils/axios';
import Headers from '@/components/Requester/Headers';
import QueryParams from '@/components/Requester/QueryParams';
import Response from '@/components/Response/Response';
import Tabs from '@/components/Tabs';

import { getQueryListFromQueryString } from './QueryParamHelper';

export default {
  components: { Headers, QueryParams, Response, Tabs },
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
