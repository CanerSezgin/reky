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
    </v-container>
  </div>
</template>

<script>
import Tabs from '@/components/Tabs';
import History from '@/components/History/History';
import Collections from '@/components/Collections/Collections';

export default {
  components: { Tabs, History, Collections },
};
</script>

<style lang="scss" scoped></style>
