<template>
  <div>
    <v-list two-line>
      <v-list-item v-for="(req, index) in reqs" :key="index">
        <v-list-item-avatar @click="" style="cursor:pointer">
          <span
            class="status-code"
            :style="`color: ${getStatusCodeColor(req.statusCode)}`"
            >{{ req.statusCode }}</span
          >
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title @click="" style="cursor:pointer">
            <div style="display: flex;">
              <div
                class="status-code"
                style="width: 110px;"
                :style="`color: ${getStatusCodeColor(req.statusCode)}`"
              >
                {{ req.method.toUpperCase() }}
              </div>
              <div class="request-title" style="width: 100%;">
                {{ req.title }}
              </div>
            </div>
          </v-list-item-title>

          <v-list-item-subtitle
            class="mt-1 caption"
            v-text="req.fullUrl"
          ></v-list-item-subtitle>
          <v-list-item-subtitle class="mt-1 caption">{{
            req.date | formatDate
          }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-menu offset-y :position-y="100">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="grey lighten-1">mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list class="py-0 my-0">
              <v-list-item
                v-for="(action, actionIndex) in actions"
                :key="actionIndex"
                @click="$emit(action.type, index)"
              >
                <v-icon>{{ action.icon }}</v-icon>
                <span class="ml-3">{{ action.title }}</span>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { getStatusCodeColor } from '@/utils/statusCode';
export default {
  props: {
    reqs: { type: Array, default: () => [] },
  },
  data() {
    return {
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
    getStatusCodeColor(statusCode) {
      return getStatusCodeColor(statusCode);
    },
  },
};
</script>

<style lang="scss" scoped>
.v-list-item {
  border-bottom: 1px solid #e5e7eb;
}
.status-code {
  font-family: Lato;
  font-weight: 600;
}
.request-title {
  color: #808080;
}
</style>
