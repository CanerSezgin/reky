<template>
  <div>
    <v-text-field
      v-model="searchStr"
      filled
      hide-details
      placeholder="Search"
    ></v-text-field>
    <RequestCard
      :reqs="results"
      :actions="actions"
      @save="save"
      @delete="removeRecord"
    />

    <div v-if="!results.length">
      <div
        class="mt-2 font-weight-bold text-center"
        style="color: salmon; font-family: Lato; font-size: 1.05rem;"
      >
        No Records Found
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getStatusCodeColor } from '@/utils/statusCode';
import RequestCard from '@/components/RequestCard';

export default {
  components: { RequestCard },
  computed: {
    ...mapState('history', ['history']),
    results() {
      return this.history.filter(
        (r) =>
          (r.urlWithParams || '')
            .toLowerCase()
            .includes(this.searchStr.toLowerCase()) ||
          (r.title || '').toLowerCase().includes(this.searchStr.toLowerCase())
      );
    },
  },
  data() {
    return {
      searchStr: '',
      actions: [
        {
          type: 'save',
          title: 'Save Request',
          icon: 'mdi-content-save-settings-outline',
        },
        { type: 'delete', title: 'Delete', icon: 'mdi-delete' },
      ],
    };
  },
  methods: {
    ...mapActions('history', ['removeRecord']),
    getStatusCodeColor(statusCode) {
      return getStatusCodeColor(statusCode);
    },
    save(index) {
      console.log('coming soon', index);
    },
  },
};
</script>

<style lang="scss" scoped></style>
