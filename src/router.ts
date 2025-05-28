import pageForm from './pages/page-form.vue';
import PagePreview from './pages/page-preview.vue';

import { createWebHistory, createRouter } from 'vue-router';

export const routes = [
    { path: '/', component: pageForm },
    { path: '/preview', component: PagePreview },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
