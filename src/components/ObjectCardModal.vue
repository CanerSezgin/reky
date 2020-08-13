<template>
  <v-dialog v-if="instance" v-model="instance.status" width="600">
    <v-card>
      <v-card-title class="headline blue-grey darken-1 white--text dark">
        {{ instance.key }}
      </v-card-title>

      <div class="mx-5">
        <SingleData :singleData="instance.data" />
      </div>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="instance.close()">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import SingleData from "@/components/SingleData";
export class ObjectCardModalService {
  constructor() {
    this.setDefaultProps();
  }
  setDefaultProps() {
    const defaultProps = {
      status: false,
      data: null,
      key: "",
    };
    Object.keys(defaultProps).forEach((props) => {
      this[props] = defaultProps[props];
    });
  }
  open(key, obj) {
    this.status = true;
    this.data = obj;
    this.key = key;
  }
  close() {
    this.setDefaultProps();
  }
}
export default {
  components: {
    SingleData,
  },
  props: ["instance"],
};
</script>

<style lang="scss" scoped></style>
