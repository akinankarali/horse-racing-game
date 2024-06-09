<template>
  <div>
    <button :disabled="disabled" @click="handleAction">{{ title }}</button>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleAction() {
      this.$emit('action');
    },
  },
};
</script>
