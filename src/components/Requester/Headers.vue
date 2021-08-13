<template>
  <div>
    <KeyValueForm listName="Headers" :list="headers" keyLabel="Header" />
  </div>
</template>

<script>
import KeyValueForm from "@/components/Requester/KeyValueForm";

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
