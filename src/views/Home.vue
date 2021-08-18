<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <Requester />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Requester from '@/components/Requester/Requester';

export default {
  components: {
    Requester,
  },
  data() {
    return {
      examples: [
        {
          endpoint: 'https://api.n.exchange/en/api/v1/currency/',
        },
        {
          endpoint: 'https://api.github.com/users',
          status: 200,
          type: 'Multiple',
          desc:
            'If the response contains many objects, it will be displated as a DataTable',
        },
        {
          endpoint: 'https://api.github.com/users/canersezgin',
          status: 200,
          type: 'Single',
          desc:
            'If the response is a single object, it will be displayed as a List rather than DataTable',
        },
        {
          endpoint: 'https://jsonplaceholder.typicode.com/posts?_limit=8',
          status: 200,
          type: 'Multiple',
          desc: 'You can send a query if the endpoint supports',
        },
        {
          endpoint: 'https://jsonplaceholder.typicode.com/users',
          status: 200,
          type: 'Multiple',
          desc: 'If the multiple data response contains object, it is ignored',
        },
      ],
    };
  },
  mounted() {
    this.screenWidth = window.innerWidth;
  },
};
</script>

<style lang="scss" scoped>
ul > li {
  list-style-type: none;
  padding: 7px 0;
}
</style>
