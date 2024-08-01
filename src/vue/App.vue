<template>
  <div ref="el" :class="$style.wrapper">
    <focusable-item />
    <focusable-item />
    <focusable-item />
    <focusable-item />
    <focusable-item />
    <focusable-item />
    <focusable-item />
    <focusable-item />
    <focusable-item />
    <focusable-item />
    <focusable-item />
    <focusable-item />
    <focusable-item />
    <focusable-item />
  </div>
</template>

<script setup lang="ts">
import shuffle from 'lodash/shuffle';
import FocusableItem from '@/vue/FocusableItem.vue';
import useVueFocusableHook from '@/vue/useVueFocusable';
import { onMounted, provide } from 'vue';

const rows = shuffle([
  {
    title: 'Recommended'
  },
  {
    title: 'Movies'
  },
  {
    title: 'Series'
  },
  {
    title: 'TV Channels'
  },
  {
    title: 'Sport'
  }
]);
const assets = [
  {
    title: 'Asset 1',
    color: '#714ADD'
  },
  {
    title: 'Asset 2',
    color: '#AB8DFF'
  },
  {
    title: 'Asset 3',
    color: '#512EB0'
  },
  {
    title: 'Asset 4',
    color: '#714ADD'
  },
  {
    title: 'Asset 5',
    color: '#AB8DFF'
  },
  {
    title: 'Asset 6',
    color: '#512EB0'
  },
  {
    title: 'Asset 7',
    color: '#714ADD'
  },
  {
    title: 'Asset 8',
    color: '#AB8DFF'
  },
  {
    title: 'Asset 9',
    color: '#512EB0'
  }
];

const { el, focusKey, focusSelf } = useVueFocusableHook({ focusKey: 'MENU' });

provide('parentFocusKey', 'MENU')

onMounted(() => {
  focusSelf();
});
</script>

<style module>
body {
  padding: 40px;
}

.wrapper {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr;
}
</style>
