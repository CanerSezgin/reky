<template>
  <div>
    <KeyValueForm
      :list="queryList"
      keyLabel="Parameter"
      @valid-list-changed="validListChanged"
    />
  </div>
</template>

<script>
import KeyValueForm from '@/components/Requester/KeyValueForm';
import { getQueryStringFromQueryList } from './QueryParamHelper';

export default {
  components: { KeyValueForm },
  props: {
    queryList: Array,
  },
  methods: {
    validListChanged() {
      const queryString = getQueryStringFromQueryList(this.queryList);
      if (queryString) this.$emit('query-string-changed', queryString);
    },
  },
};
</script>
