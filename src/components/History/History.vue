<template>
  <div>
    <v-text-field
      v-model="searchStr"
      filled
      hide-details
      placeholder="Search"
    ></v-text-field>
    <HistoryList :reqs="results" />
  </div>
</template>

<script>
import HistoryList from '@/components/History/HistoryList';

export default {
  components: { HistoryList },
  computed: {
    results() {
      return this.reqs.filter(
        (r) =>
          (r.request || '')
            .toLowerCase()
            .includes(this.searchStr.toLowerCase()) ||
          (r.title || '').toLowerCase().includes(this.searchStr.toLowerCase())
      );
    },
  },
  data() {
    return {
      searchStr: '',
      reqs: [
        {
          date: new Date('Jan 9, 2014'),
          method: 'DELETE',
          request: 'https://jsonplaceholder.typicode.com/posts?a=25&b=9',
          statusCode: 404,
          title: 'Request Title',
        },
        {
          date: new Date('May 19, 2021'),
          method: 'GET',
          request: 'https://another.typicode.com/posts?a=25&b=9',
          statusCode: 300,
          title: '',
        },
        {
          date: new Date('Jan 9, 2014'),
          method: 'POST',
          request: 'https://jsonplaceholder.typicode.com/posts?a=25&b=9',
          statusCode: 201,
          title: 'Another Request',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
