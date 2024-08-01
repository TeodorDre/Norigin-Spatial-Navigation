<template>
  <button :class="{ [$style.focused]: focused }" type="button" ref="el"> {{ uniqueId() }} button</button>
</template>

<script setup lang="ts">
import uniqueId from 'lodash/uniqueId';
import useVueFocusableHook from '@/vue/useVueFocusable';
import { watch } from 'vue';

const { el, focusKey, focusSelf, hasFocusedChild, focused } = useVueFocusableHook({
  focusable: true,
  trackChildren: true,
  autoRestoreFocus: true,
  isFocusBoundary: false,
  preferredChildFocusKey: null,
  onEnterPress: () => {
  },
  onEnterRelease: () => {
  },
  onArrowPress: () => true,
  onFocus: () => {
  },
  onBlur: () => {
  },
  extraProps: { foo: 'bar' }
})

watch(focused, (val) => {
  console.log(val);
})
</script>

<style module>
.focused {
  background: blue;
}
</style>
