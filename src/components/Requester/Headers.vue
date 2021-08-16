<template>
  <div>
    <KeyValueForm
      :list="headers"
      keyLabel="Header"
      @updated="$emit('updated', headers)"
    />
  </div>
</template>

<script>
import KeyValueForm from '@/components/Requester/KeyValueForm';

export default {
  components: { KeyValueForm },
  props: {
    headers: {
      type: Array,
      required: true,
    },
  },
};
</script>
