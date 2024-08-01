<script setup>
defineProps({
  myName: {
    type: String,
    required: true
  }
})
</script>

<template>
    <h1 class="green">{{ myName }}</h1>
</template>