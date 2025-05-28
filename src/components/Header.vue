<script setup lang="ts">
import IconLogo from '../assets/icon-logo.vue';
</script>

<template>
    <header class="header">
        <RouterLink to="/">
            <icon-logo />
        </RouterLink>

        <nav class="header__navigation">
            <router-link class="header__navigation-link" to="/">Форма</router-link>
            <router-link class="header__navigation-link" to="/preview">Превью</router-link>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
@use 'sass:color';

.header {
    display: flex;
    align-items: center;
    min-height: 76px;
    padding: 0 50px;
    border-bottom: 1px solid #1111111a;

    &__navigation {
        flex-grow: 1;
        display: flex;
        justify-content: center;
        gap: 24px;
    }

    &__navigation-link {
        padding: 28px 14px;
        color: #8d8d8d;
        transition:
            color 0.3s ease,
            background 0.3s ease;

        @media (hover: hover) {
            &:hover {
                background: #8d8d8d;
                color: #fff;
            }
        }
    }
}
</style>
