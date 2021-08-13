<template>
  <div>
    <pre ref="editor">{{ content }}</pre>
  </div>
</template>

<script>
import ace from "ace-builds";
import "ace-builds/webpack-resolver";

export default {
  props: {
    opts: {
      type: Object,
      default: {
        theme: "chrome",
        language: "json",
        readOnly: false,
      },
    },
    content: {
      type: [String, Object, Array, Boolean],
    },
  },
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    const editor = ace.edit(this.$refs.editor, {
      wrap: true,
      autoScrollEditorIntoView: true,
      maxLines: 20,
      minLines: 20,
      theme: `ace/theme/${this.opts.theme}`,
      mode: `ace/mode/${this.opts.language}`,
      readOnly: this.opts.readOnly,
      fontSize: 16,
    });
    this.editor = editor;
    console.log(editor);
  },
};
</script>
