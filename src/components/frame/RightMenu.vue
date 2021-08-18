<template>
  <div>
    <v-container>
      <Tabs
        :tabs="[`History`, `Collections`]"
        activeBtnType="background"
        color="#ddd"
      >
        <template v-slot:tab-0> <History /> </template>
        <template v-slot:tab-1> <Collections /> </template>
      </Tabs>

      <v-expansion-panels
        :value="history.length ? 1 : 0"
        style="position: absolute; bottom: 0px; "
      >
        <v-expansion-panel v-for="(item, i) in 1" :key="i">
          <v-expansion-panel-header color="#fa8072" class="white--text">
            Example Requests
            <template v-slot:actions>
              <v-icon color="white">
                mdi-menu-up
              </v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <RequestCard :reqs="examples" :twoLine="false" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Tabs from '@/components/Tabs';
import History from '@/components/History/History';
import RequestCard from '@/components/RequestCard';
import Collections from '@/components/Collections/Collections';

export default {
  components: { Tabs, History, RequestCard, Collections },
  computed: {
    ...mapState('history', ['history']),
  },
  data() {
    return {
      examples: [
        {
          statusCode: 200,
          title: 'Get All Posts [ DataTable ]',
          url: 'https://jsonplaceholder.typicode.com/posts',
          method: 'get',
          qs:
            '?url=https://jsonplaceholder.typicode.com/posts&title=Get All Posts [ DataTable ]&method=get',
          urlWithParams: 'https://jsonplaceholder.typicode.com/posts',
        },
        {
          statusCode: 200,
          title: 'Get First User [ Card ]',
          url: 'https://api.github.com/users/1',
          method: 'get',

          qs:
            '?url=https://api.github.com/users/1&title=Get First User [ Card ]&method=get',
          urlWithParams: 'https://api.github.com/users/1',
        },
        {
          statusCode: 200,
          title: 'Get Dog Images',
          url: 'https://dog.ceo/api/breeds/image/random/3',
          method: 'get',
          qs:
            '?url=https://dog.ceo/api/breeds/image/random/3&title=Get Dog Images&method=get',
          urlWithParams: 'https://dog.ceo/api/breeds/image/random/3',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
