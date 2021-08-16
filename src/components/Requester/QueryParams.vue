<template>
  <div>
    <KeyValueForm
      :list="queryList"
      keyLabel="Parameter"
      @updated="$emit('updated', queryList)"
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
};
</script>
