<template>
  <div>
    <div class="my-4">Response</div>
    <div class="my-3" style="display: flex;">
      <div>
        Status:
        <span
          class="ml-1 bold"
          :style="`color: ${statusCodeColor}`"
          v-text="
            statusCode ? `${statusCode} ${statusText}` : '(request not sent)'
          "
        ></span>
      </div>
      <v-spacer></v-spacer>

      <div>
        Duration:
        <span class="primary--text bold">{{ duration }}</span>
        ms
      </div>
    </div>

    <div v-if="response">
      <Tabs
        :tabs="[`Body`, `Headers &nbsp; ∷ &nbsp;  ${headers.length}`]"
        color="#00bcd4"
      >
        <template v-slot:tab-0>
          <Body :body="response.data" :responseType="responseType" />
        </template>
        <template v-slot:tab-1>
          <Headers :headers="headers" />
        </template>
      </Tabs>
    </div>
  </div>
</template>

<script>
import { getStatusCodeColor } from '@/utils/statusCode';
import Headers from '@/components/Response/Headers';
import Body from '@/components/Response/Body';
import Tabs from '@/components/Tabs';

const getDefaultStatusText = (statusCode) => {
  if (!statusCode || isNaN(statusCode)) return '';
  const mapper = {
    404: 'Not Found',
  };
  return mapper[statusCode] || '';
};

export default {
  components: { Headers, Body, Tabs },
  props: {
    response: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      tab: '',
    };
  },
  computed: {
    headers() {
      const entries = Object.entries(this.response.headers);
      return entries.map((entry) => ({ key: entry[0], value: entry[1] }));
    },
    statusCode() {
      return this.response && this.response.status;
    },
    statusText() {
      return (
        (this.response && this.response.statusText) ||
        getDefaultStatusText(this.statusCode)
      );
    },
    statusCodeColor() {
      return getStatusCodeColor(this.statusCode);
    },
    duration() {
      return (this.response && this.response.duration) || 0;
    },
    responseType() {
      const contentType =
        this.response &&
        this.response.headers &&
        this.response.headers['content-type'];

      if (contentType.includes('json')) return 'json';
      else if (contentType.includes('html')) return 'html';
      else '';
    },
  },
};
</script>

<style lang="scss" scoped>
.v-tab.v-tab--active {
  color: black;
}
</style>
