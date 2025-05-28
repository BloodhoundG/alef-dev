<script setup lang="ts">
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<template>
    <Header />

    <router-view class="router-view" />

    <Footer />
</template>

<style lang="scss" scoped>
.router-view {
    flex-grow: 1;
}
</style>
