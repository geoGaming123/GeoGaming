<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{ theBook.acf.title }}
  </div>
</template>

<script setup>
import {useTest} from '@/stores/test.js'
import { computed } from 'vue'
const testStore = useTest()

testStore.init()

const theBook = computed( () => {
  return testStore.firstBook
  })
</script>

<style></style>
