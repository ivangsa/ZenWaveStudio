<template>
  <v-snackbar
    :timeout="timeout"
    :color="color"
    :bottom="y === 'bottom'"
    :top="y === 'top'"
    :left="x === 'left'"
    :right="x === 'right'"
    :multi-line="multiLine"
    :vertical="vertical"
    v-model="active"
    class="v-application vts"
    :class="classes"
    @click="dismiss"
    role="alert"
  >
    <v-icon dark left v-if="!!icon" class="vts__icon" :color="iconColor">
      {{ icon }}
    </v-icon>

    <div class="vts__message" :class="{ 'vts__message--padded': showClose && !closeText }">
      <div v-html="message"></div>
      <slot></slot>
    </div>

    <v-btn
      :icon="!closeText"
      :text="!!closeText"
      class="vts__close"
      :class="{ 'vts__close--icon': !closeText }"
      :color="closeColor"
      v-if="showClose"
      @click="close"
    >
      <v-icon v-if="!closeText">{{ closeIcon }}</v-icon>
      <span v-if="!!closeText">{{ closeText }}</span>
    </v-btn>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'Toast',
  props: {
    x: {
      type: String,
      default: ''
    },
    y: {
      type: String,
      default: 'top'
    },
    color: {
      type: String,
      default: 'info'
    },
    icon: {
      type: String,
      default: ''
    },
    iconColor: {
      type: String,
      default: ''
    },
    classes: {
      type: [String, Object, Array],
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    timeout: {
      type: Number,
      default: 3000
    },
    dismissable: {
      type: Boolean,
      default: true
    },
    multiLine: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: false
    },
    closeText: {
      type: String,
      default: ''
    },
    closeIcon: {
      type: String,
      default: 'close'
    },
    closeColor: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    active: false
  }),
  mounted() {
    this.$nextTick(() => this.show());
  },
  watch: {
    active: function(isActive, wasActive) {
      this.$emit('statusChange', isActive, wasActive);
    }
  },
  methods: {
    show() {
      this.active = true;
    },
    close() {
      this.active = false;
    },
    dismiss() {
      if (this.dismissable) {
        this.close();
      }
    }
  }
});
</script>
