<template>
  <div>
    <div style="display: flex;" :style="tabButtonsContainerCSS">
      <div
        class="tab-btn"
        :class="selectedTabIndex === index ? 'selected' : ''"
        style="min-width: 125px; text-align: center;"
        :style="(selectedTabIndex === index ? selectedCSS : '') + tabButtonCSS"
        @click="selectTab(index)"
        v-for="(tab, index) in tabs"
        :key="index"
        v-html="tab"
      ></div>
    </div>

    <div class="mt-3" :style="tabContainerCSS">
      <div v-for="(tab, index) in tabs" :key="index">
        <slot v-if="selectedTabIndex === index" :name="`tab-${index}`"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: { type: Array, required: true },
    color: { type: String, default: 'salmon' },
    dark: { type: Boolean, default: false },
    activeBtnType: { type: String, default: 'border' }, // border, background
    tabContainerCSS: { type: String, required: false },
    tabButtonsContainerCSS: { type: String, required: false },
    tabButtonCSS: { type: String, required: false },
  },
  computed: {
    selectedCSS() {
      switch (this.activeBtnType) {
        case 'border':
          return this.selectedWithBorderCSS;
        case 'background':
          return this.selectedWithBackgroundCSS;
        default:
          return this.selectedWithBorderCSS;
      }
    },
    selectedWithBorderCSS() {
      return `border-bottom: 3px solid ${this.color};`;
    },
    selectedWithBackgroundCSS() {
      return `background: ${this.color}; ${
        this.dark ? 'color: white;' : ''
      } border-radius: 5px;`;
    },
  },
  data() {
    return {
      selectedTabIndex: 0,
    };
  },
  methods: {
    selectTab(index) {
      this.selectedTabIndex = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.tab-btn {
  margin-right: 10px;
  padding: 5px 10px;
  cursor: pointer;
  color: gray;
}
.tab-btn:hover {
  color: black;
  font-weight: 400;
}
.tab-btn.selected {
  color: black;
}
</style>
