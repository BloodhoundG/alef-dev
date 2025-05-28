<script setup lang="ts">
import { ref } from 'vue';

// Переменная для данных о пользователе и его детях
const userData = ref();

// Из локал стора берутся данные о пользователе и их детях
const localUserData = localStorage.getItem('user-data');

// Если эти данные есть в локал сторе
if (localUserData) {
    // Они присваиваются переменной userData для отображения на странице
    userData.value = JSON.parse(localUserData);
}
</script>

<template>
    <div class="page-preview">
        <div class="container">
            <div class="page-review__output-data">
                <h2 class="page-preview__title">Персональные данные</h2>
                <p class="page-preview__parent-data">{{ userData['parent-name'] }}, {{ userData['parent-age'] }} лет</p>

                <h2 class="page-preview__title">Дети</h2>

                <div class="page-preview__children-list">
                    <span class="page-preview__children-item" v-for="child in userData.children">
                        {{ child.name }}, {{ child.age }} лет
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.page-preview {
    padding: 30px 0 0;

    &__title {
        font-size: 16px;
        font-weight: 500;

        &:not(:first-child) {
            padding: 60px 0 0;
        }
    }

    &__parent-data {
        padding: 20px 0 0;
        font-size: 16px;
        font-weight: 700;

        &::first-letter {
            text-transform: uppercase;
        }
    }

    &__children-list {
        padding: 0 0 30px;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
    }

    &__children-item {
        padding: 10px 20px;
        margin: 20px 0 0;
        background: #f1f1f1;
        border-radius: 5px;
        font-weight: 700;

        &::first-letter {
            text-transform: uppercase;
        }
    }
}
</style>
