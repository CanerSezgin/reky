<template>
  <div>
    <v-row>
      <v-text-field
        v-model="req.title"
        filled
        hide-details
        label="Request Name"
        placeholder="Request Name"
        append-icon="mdi-record-circle-outline"
      ></v-text-field>
    </v-row>
    <v-row class="mt-1">
      <v-card flat class="transparent" width="150">
        <v-select
          v-model="req.method"
          :items="METHODS"
          item-text="text"
          item-value="value"
          label="Method"
          filled
          hide-details
        ></v-select>
      </v-card>

      <v-text-field
        v-model="req.urlWithParams"
        label="URL"
        aria-autocomplete="off"
        filled
        hide-details
        @keyup.enter="send"
      ></v-text-field>

      <v-btn @click="send" x-large height="56">
        <v-icon left>mdi-send</v-icon> Send
      </v-btn>
    </v-row>

    {{ req }}
    <v-row class="mt-4">
      <v-col>
        <Tabs
          :tabs="[
            `Parameters &nbsp; ∷ &nbsp;  ${req.params.length}`,
            `Headers &nbsp; ∷ &nbsp;  ${req.headers.length}`,
            `Body`,
          ]"
        >
          <template v-slot:tab-0
            ><QueryParams :queryList="req.params" @updated="req.update()"
          /></template>
          <template v-slot:tab-1>
            <Headers :headers="req.headers" @updated="req.update()" />
          </template>
          <template v-slot:tab-2> <BodyEditor /> </template>
        </Tabs>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <div v-if="response && response.config">
      <Response :response="response" />
    </div>
    <div v-else-if="response && !response.config && response.e">
      {{ response.e.message }}
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { axiosRequest } from '@/utils/axios';
import { History, RequestObj } from '@/classes';
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
      METHODS: [
        { text: 'GET', value: 'get' },
        { text: 'POST', value: 'post' },
        { text: 'PUT', value: 'put' },
        { text: 'PATCH', value: 'patch' },
        { text: 'DELETE', value: 'delete' },
        { text: 'HEAD', value: 'head' },
        { text: 'OPTIONS', value: 'options' },
      ],
      req: {},
      response: null,
    };
  },
  computed: {
    title() {
      return this.req.title;
    },
    url() {
      return this.req.url;
    },
    method() {
      return this.req.method;
    },
    urlWithParams() {
      return this.req.urlWithParams;
    },
  },
  watch: {
    title() {
      this.req.update();
    },
    url() {
      this.req.update();
    },
    method() {
      this.req.update();
    },
    urlWithParams(val) {
      if (val) {
        const [url = '', queryString = ''] = val.split('?');
        this.req.url = url;
        this.req.params = getQueryListFromQueryString(
          val.includes('?') ? `?${queryString}` : ''
        );
      }
    },
  },
  created() {
    this.req = new RequestObj(this.$route.query);
    console.log(this.req);
  },
  methods: {
    ...mapActions('history', ['addRecord']),
    async send() {
      const response = await axiosRequest({
        method: this.method,
        url: this.url,
        config: {},
      });
      this.response = response;
      console.log(this.response);
      const historyRecord = new History(this.response, this.title);
      this.addRecord(historyRecord);
    },
  },
};
</script>

<style lang="scss" scoped></style>
