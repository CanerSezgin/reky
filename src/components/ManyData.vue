<template>
  <div>
    <ObjectCardModal :instance="objectCardModalInstance" />

    <!-- Labels -->
    <div class="labels">
      <v-chip
        v-for="(header, i) in headers"
        :key="i"
        label
        class="ma-2 white--text"
        :color="color[i % 5]"
      >
        {{ header.text }}
      </v-chip>
    </div>

    <!-- Web -->
    <v-data-table
      v-if="screenWidth > 599"
      dense
      :headers="headers"
      :items="body"
      :items-per-page="10"
      class="elevation-3"
    >
      <template
        v-for="objectKey in ['address', 'company']"
        v-slot:[`item.${objectKey}`]="{ item }"
      >
        <div @click="objectCardModalInstance.open(objectKey, item[objectKey])">
          [ Object ]
        </div>
      </template>
    </v-data-table>

    <!-- Mobile -->
    <div v-if="screenWidth < 600">
      <v-card
        class="px-5 elevation-10 mb-1"
        v-for="(data, i) in body.filter(
          (data, i) => i < mobilePage * 5 && i >= (mobilePage - 1) * 5
        )"
        :key="i"
        :class="i % 2 === 0 ? 'red-border' : 'blue-border'"
      >
        <v-layout row wrap>
          <v-flex
            xs6
            v-for="(header, j) in headers"
            :key="j"
            class="mb-1 px-2 pt-1"
          >
            <div class="subtitle-1 font-weight-medium longtext">
              {{ header.text }}
            </div>
            <div class="subtitle-2 font-weight-light longtext">
              {{ data[header.value] }}
            </div>
          </v-flex>
        </v-layout>
      </v-card>

      <v-pagination
        class="mt-3"
        v-model="mobilePage"
        :length="Math.ceil(body.length / 5)"
        :total-visible="5"
        color="pink"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
import ObjectCardModal, {
  ObjectCardModalService,
} from "@/components/ObjectCardModal";

export default {
  components: {
    ObjectCardModal,
  },
  props: ["headers", "body", "screenWidth"],
  data() {
    return {
      objectCardModalInstance: new ObjectCardModalService(),
      mobilePage: 1,
      color: [
        "primary",
        "teal darken-1",
        "cyan darken-2",
        "pink",
        "orange darken-2",
      ],
    };
  },
};
</script>

<style scoped>
.red-border {
  border-left: 5px solid #e91e63;
}
.blue-border {
  border-left: 5px solid #0097a7;
}
</style>
