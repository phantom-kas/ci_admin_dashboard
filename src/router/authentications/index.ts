export default [
    {
        path: '/authentication',
        name: 'authentication',
        component: () => import('../../views/phase_1/index.vue'),
        children: [
            {
                path: '/login',
                name: 'login',
                alias: '/signin',
                component: () => import('../../views/phase_1/login.vue'),
            },
            {
                path: '/signup',
                name: 'signup',
                alias: '/register',
                component: () => import('../../views/phase_1/sign_up.vue'),
            },
            {
                path: '/change_password',
                name: 'change_password',
                component: () => import('../../views/phase_1/change_password.vue'),
            },
            {
                path: '/reset_password',
                name: 'reset_password',
                component: () => import('../../views/phase_1/reset_password.vue'),
            },
            {
                path: '/enter_verification_code',
                name: 'enter_verification_code',
                component: () => import('../../views/phase_1/verification_code.vue'),
            }
        ]
    },

]