<template>
  <div>
    <div class="my-4">Response</div>
    <div class="my-3" style="display: flex;">
      <div>
        Status:
        <span
          class="ml-2 font-weight-bold"
          :style="`color: ${statusCodeColor}`"
          v-text="statusCode || '(request not sent)'"
          >{{ statusCode }}</span
        >
      </div>
      <v-spacer></v-spacer>

      <div>
        Duration: <span>{{ duration }}</span> ms
      </div>
    </div>

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
import Headers from '@/components/Response/Headers';
import Body from '@/components/Response/Body';
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
    statusCodeColor() {
      if (this.statusCode >= 200 && this.statusCode < 300) {
        return '#4DB6AC'; // green
      } else if (this.statusCode >= 300 && this.statusCode < 400) {
        return '#0097A7'; // blue
      } else if (this.statusCode >= 400) {
        return '#FF7043'; // red
      } else {
        return '#78909C'; // gray
      }
    },
    duration() {
      return (this.response && this.response.duration) || 0;
    },
    responseType() {
      const contentType = this.response.headers['content-type'];

      if (contentType.includes('json')) return 'json';
      else if (contentType.includes('html')) return 'html';
      else '';
    },
  },
};
</script>

<style lang="scss" scoped></style>
