<template>
  <div>
    <v-text-field
      v-model="searchStr"
      filled
      hide-details
      placeholder="Search"
    ></v-text-field>
    <HistoryList :reqs="results" @save="save" @delete="removeRecord" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import HistoryList from '@/components/History/HistoryList';

export default {
  components: { HistoryList },
  computed: {
    ...mapState('history', ['history']),
    results() {
      return this.history.filter(
        (r) =>
          (r.fullUrl || '')
            .toLowerCase()
            .includes(this.searchStr.toLowerCase()) ||
          (r.title || '').toLowerCase().includes(this.searchStr.toLowerCase())
      );
    },
  },
  data() {
    return {
      searchStr: '',
    };
  },
  methods: {
    ...mapActions('history', ['removeRecord']),
    save(index) {
      console.log('coming soon', index);
    },
  },
};
</script>

<style lang="scss" scoped></style>
