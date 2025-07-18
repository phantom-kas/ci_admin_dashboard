export default [
    {
        name:'dashboard',
        path:'/dashboard',
        alias:'/',
        component: () => import('../../views/auth/dashboard.vue'),
    }
]