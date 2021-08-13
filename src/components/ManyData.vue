<template>
  <div>
    <ObjectCardModal :instance="objectCardModalInstance" />
    <!-- Labels -->
    <div class="labels">
      <v-chip
        v-for="(header, i) in headers"
        @click="changeStatus(header)"
        :key="i"
        label
        class="ma-2"
        :color="`${header.status ? 'darken-1' : 'lighten-5'} ${color[i % 5]}`"
        :dark="header.status"
      >
        {{ header.text }}
      </v-chip>
    </div>

    <!-- Web -->
    <v-data-table
      v-if="screenWidth > 599"
      dense
      :headers="headers.filter((header) => header.status)"
      :items="body"
      :items-per-page="10"
      class="elevation-3"
    >
      <template
        v-for="objectKey in ['address', 'company']"
        v-slot:[`item.${objectKey}`]="{ item }"
      >
        <div
          class="special pointer"
          @click="objectCardModalInstance.open(objectKey, item[objectKey])"
        >
          Details
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
} from '@/components/ObjectCardModal';

export default {
  components: {
    ObjectCardModal,
  },
  props: {
    array: {
      type: Array,
      required: true,
    },
    screenWidth: {
      type: Number,
      default: 600,
    },
  },
  data() {
    return {
      headers: [],
      body: [],
      objectCardModalInstance: new ObjectCardModalService(),
      mobilePage: 1,
      color: ['purple', 'teal ', 'cyan', 'pink', 'orange'],
    };
  },
  created() {
    const keys = Object.keys(this.array[0]);
    this.createTable(keys, this.array);
  },
  methods: {
    changeStatus(header) {
      console.log(header);
      header.status = !header.status;
    },
    capitalize: (str) =>
      str ? str.charAt(0).toUpperCase() + str.slice(1) : '',
    cleanTable() {
      this.headers = [];
      this.body = [];
    },
    createTable(keys, dataset) {
      this.cleanTable();
      if (keys.length > 0) {
        dataset.forEach((data, i) => {
          let result = {};
          if (i === 0) {
            keys.forEach((key) => {
              this.headers.push({
                text: this.capitalize(key),
                value: key,
                status: true,
              });
            });
          }
          keys.forEach((key) => {
            result[key] = data[key];
          });
          this.body.push(result);
        });
      }
    },
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
