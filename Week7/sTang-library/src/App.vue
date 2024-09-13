<script setup>
// import JSONLab from './components/JSONLab.vue'
import BootstrapHeader from './components/BootstrapHeader.vue'
</script>

<template>
    <header>
        <BootstrapHeader />
    </header>

    <main class="main-box">
        <router-view></router-view>
        <!-- <JSONLab /> -->
    </main>
</template>