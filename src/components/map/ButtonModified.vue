<template>
    <button @click="redirectToModified">Modifier</button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps(['id'])
const router = useRouter()

const redirectToModified = () => {
  router.push({ name: 'modified', params: { id: props.id } })
}
</script>
