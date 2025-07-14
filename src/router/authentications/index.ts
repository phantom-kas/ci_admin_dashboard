export default [
    {
        path: '/authentication',
        name: 'authentication',
        component: () => import('../../views/phase_1/index.vue'),
        children: [
            {
                path: '/login',
                name: 'login',
                component: () => import('../../views/phase_1/login.vue'),
            }
        ]
    },

]