<script setup lang="ts">
import { ref } from 'vue';
import { useForm, Field, ErrorMessage, defineRule } from 'vee-validate';

// Правило для обязательных полей формы
defineRule('required', (value: string | number) => {
    if (value === undefined || value === null || value === '') {
        return 'Это поле обязательно для заполнения';
    }
    return true;
});

// Правило для полей с именем, где можно использовать только латиницу или кириллицу
defineRule('lettersOnly', (value: string) => {
    if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(value)) {
        return 'Имя должно содержать только буквы, пробелы и дефисы';
    }
    return true;
});

// Правило для минимального значения возраста
defineRule('minAge', (value: number) => {
    if (value < 1) {
        return 'Возраст должен быть больше 0';
    }
    return true;
});

// Правило для максимального значения возраста (для родителя)
defineRule('maxAge', (value: number) => {
    if (value > 120) {
        return 'Введите корректный возраст';
    }
    return true;
});

// Правило для максимального значения возраста (для ребёнка)
defineRule('maxChildrenAge', (value: number) => {
    if (value > 18) {
        return 'Ребенок должен быть младше 18 лет';
    }
    return true;
});

// Вытаскивается обработчик формы и устанавливаются начальные значения для полей формы
const { handleSubmit } = useForm({
    initialValues: {
        'parent-name': '',
        'parent-age': '',
    },
});

// Булево значение успешной отправки формы
const isFormSuccess = ref(false);

// Функция сработает при вводе валидных данных
const onSubmit = handleSubmit(values => {
    // При валидном вводе всех полей формы происходит запись данных в локал стор
    localStorage.setItem('user-data', JSON.stringify(values));
    isFormSuccess.value = true;

    setTimeout(() => {
        isFormSuccess.value = false;
    }, 3000);
});

// Интерфейс для массива данных о детях
interface IChildren {
    name?: string | '';
    age?: number | '';
}

// Массив данных о детях
const childrenArray = ref<IChildren[]>([]);

// Функция добавляет ребёнка массив
const onAddChildren = () => {
    if (childrenArray.value.length < 5) {
        childrenArray.value.push({ name: '', age: '' });
    }
};

// Функция удаляет выбранного ребёнка из массива
const onDeleteChildren = (childrenIndex: number) => {
    childrenArray.value = childrenArray.value.filter((_, index) => index !== childrenIndex);
};
</script>

<template>
    <div class="page-form">
        <div class="container">
            <form @submit.prevent="onSubmit">
                <div class="page-form__personal-data">
                    <h2 class="page-form__title">Персональные данные</h2>

                    <label class="page-form__label">
                        <span class="page-form__label-placeholder"> Имя </span>
                        <Field
                            name="parent-name"
                            type="text"
                            class="page-form__input"
                            placeholder="Введите ваше имя"
                            rules="required|lettersOnly"
                            :validateOnInput="true"
                        />
                        <ErrorMessage name="parent-name" class="error-message" />
                    </label>

                    <label class="page-form__label">
                        <span class="page-form__label-placeholder"> Возраст </span>
                        <Field
                            name="parent-age"
                            type="number"
                            class="page-form__input"
                            placeholder="Введите ваш возраст"
                            rules="required|minAge|maxAge"
                            :validateOnInput="true"
                        />
                        <ErrorMessage name="parent-age" class="error-message" />
                    </label>
                </div>

                <div class="page-form__children-data">
                    <div class="page-form__title-wrapper">
                        <h2 class="page-form__title">Дети (макс.5)</h2>

                        <button
                            v-if="childrenArray.length < 5"
                            class="page-form__add-button"
                            type="button"
                            @click="onAddChildren"
                        >
                            Добавить ребенка
                        </button>
                    </div>

                    <div class="page-form__children-list">
                        <div class="page-form__children-item" v-for="(_, index) in childrenArray" :key="index">
                            <label class="page-form__label">
                                <span class="page-form__label-placeholder"> Имя </span>
                                <Field
                                    :name="`children[${index}].name`"
                                    type="text"
                                    class="page-form__input"
                                    placeholder="Имя ребенка"
                                    rules="required|lettersOnly"
                                    :validateOnInput="true"
                                />
                                <ErrorMessage :name="`children[${index}].name`" class="error-message" />
                            </label>

                            <label class="page-form__label">
                                <span class="page-form__label-placeholder"> Возраст </span>
                                <Field
                                    :name="`children[${index}].age`"
                                    type="number"
                                    class="page-form__input"
                                    placeholder="Возраст ребенка"
                                    rules="required|minAge|maxChildrenAge"
                                    :validateOnInput="true"
                                />
                                <ErrorMessage :name="`children[${index}].age`" class="error-message" />
                            </label>

                            <button class="page-form__remove-button" type="button" @click="onDeleteChildren(index)">
                                Удалить
                            </button>
                        </div>
                    </div>

                    <button class="page-form__save-button" type="submit">Сохранить</button>
                    <p v-if="isFormSuccess" class="success-message">Форма успешно отправлена</p>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use 'sass:color';

.success-message {
    font-size: 12px;
    color: #008000;
}

.error-message {
    font-size: 12px;
    color: #ff0000;
}

.page-form {
    padding: 30px 0 0;

    &__title-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0 20px;

        .page-form__title {
            padding: 0;
        }
    }

    &__add-button {
        display: flex;
        align-items: center;
        position: relative;
        padding: 13px 20px 13px 46px;
        background: none;
        border-radius: 100px;
        border: 2px solid #01a7fd;
        color: #01a7fd;

        transition:
            background 0.3s ease,
            color 0.3s ease;

        @media (hover: hover) {
            &:hover {
                background: #01a7fd;
                color: #fff;

                &::before,
                &::after {
                    background: #fff;
                }
            }
        }

        &::before,
        &::after {
            transition: background 0.6s ease;
        }

        &::before {
            content: '';
            position: absolute;
            left: 20px;
            display: inline-block;
            width: 16px;
            height: 2px;
            background: #01a7fd;
            border-radius: 130px;
        }

        &::after {
            content: '';
            position: absolute;
            left: 20px;
            display: inline-block;
            width: 16px;
            height: 2px;
            background: #01a7fd;
            border-radius: 130px;
            transform: rotate(90deg);
        }
    }

    &__title {
        padding: 0 0 20px;
        font-weight: 500;
    }

    &__personal-data {
        display: flex;
        flex-direction: column;
        padding: 0 0 44px;
    }

    &__label {
        position: relative;
        display: inline-block;

        &:not(:last-child) {
            padding: 0 0 10px;
        }
    }

    &__label-placeholder {
        position: absolute;
        left: 16px;
        top: 8px;
        font-size: 13px;
        color: #8d8d8d;
    }

    &__input {
        width: 100%;
        padding: 26px 16px 6px;
        font-size: 14px;
        border-radius: 4px;
        border: 1px solid #f1f1f1;
    }

    &__remove-button {
        width: 100%;
        background: none;
        border: none;
        font-size: 14px;
        color: #01a7fd;

        @media (hover: hover) {
            &:hover {
                color: color.scale(#01a7fd, $lightness: 30%);
            }
        }
    }

    &__children-data {
        padding: 0 0 44px;
    }

    &__children-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    &__children-item {
        display: flex;
        gap: 18px;

        .page-form__label {
            min-width: 260px;
            padding: 0;
        }
    }

    &__save-button {
        padding: 13px 20px;
        margin: 30px 0 0;
        border-radius: 100px;
        background: #01a7fd;
        border: none;
        color: #fff;
        font-size: 14px;
        transition: background 0.3s ease;

        @media (hover: hover) {
            &:hover {
                background: color.scale(#01a7fd, $lightness: 30%);
            }
        }
    }
}
</style>
