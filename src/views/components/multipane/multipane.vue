<template>
  <v-layout :class="classnames" v-bind="this.$attrs" :style="{ cursor, userSelect }" @mousedown.stop="onMouseDown">
    <slot></slot>
  </v-layout>
</template>

<script src="./multipane.js"></script>

<style lang="scss">
.multipane {
  display: flex;

  &.layout-h {
    flex-direction: column;
  }

  &.layout-v {
    flex-direction: row;
  }
}

.multipane > div {
  position: relative;
  z-index: 1;
}

.multipane-resizer {
  display: block;
  position: relative;
  z-index: 2;
}

.layout-h > .multipane-resizer {
  width: 100%;
  height: 2px;
  /* margin-top: -5px; */
  /* top: 5px; */
  background-color: gray;
  cursor: row-resize;
}

.layout-v > .multipane-resizer {
  width: 2px;
  height: 100%;
  /* margin-left: -10px; */
  /* left: 10px; */
  cursor: col-resize;
  background-color: lightgray;
}
</style>
