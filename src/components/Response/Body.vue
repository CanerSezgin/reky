<template>
  <div>
    <div>
      <v-tabs fixed-tabs background-color="indigo" dark v-model="tab" ani>
        <v-tab>
          Visualize
        </v-tab>
        <v-tab> Pretty ({{ responseType }}) </v-tab>
        <v-tab>
          Raw
        </v-tab>
        <v-tab>
          Preview
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab" :key="renderKey" class="mt-2">
        <v-tab-item>
          <Visualize :json="body" />
        </v-tab-item>
        <v-tab-item>
          <editor
            :opts="{ ...editorOpts, language: responseType }"
            :content="body"
          />
        </v-tab-item>
        <v-tab-item>
          <editor :opts="{ ...editorOpts, language: 'text' }" :content="body" />
        </v-tab-item>
        <v-tab-item>
          <editor
            :opts="{ ...editorOpts, language: 'text' }"
            :content="JSON.stringify(body)"
          />
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import AceEditor from "@/components/AceEditor";
import Visualize from "@/components/Response/Visualize";

export default {
  components: {
    editor: AceEditor,
    Visualize,
  },
  props: {
    body: {
      required: false,
    },
    responseType: {
      type: String,
      required: true,
    },
  },
  computed: {
    stringifiedBody() {
      return JSON.stringify(this.body);
    },
  },
  data() {
    return {
      tab: 0,
      renderKey: 0,
      editorOpts: {
        theme: "chrome",
        readOnly: true,
      },
    };
  },
  watch: {
    body() {
      this.renderKey++;
    },
  },
};
</script>

<style lang="scss" scoped></style>
