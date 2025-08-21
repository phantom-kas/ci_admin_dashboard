import users from './users.ts';
export default [
    ...users,
    {
        name: 'dashboard',
        path: '/dashboard',
        alias: '/',
        component: () => import('../../views/auth/dashboard.vue'),
    },
    {
        name: 'tracks',
        path: '/tracks',
        // alias: '/',
        component: () => import('../../views/auth/tracks/tracks.vue'),
        children: [
            {
                name: 'add-track',
                path: 'add-track',
                // alias: '/',
                component: () => import('../../views/auth/tracks/createTrack.vue'),
            },
            {
                name: 'edit-track-image',
                path: 'edit-track-image/:id',
                // alias: '/',
                component: () => import('../../views/auth/tracks/createTrack.vue'),
            },
            {
                name: 'edit-track',
                path: 'edit-track/:id',
                // alias: '/',
                component: () => import('../../views/auth/tracks/createTrack.vue'),
            },

        ]
    },
    {
        name: 'dashboard',
        path: '/dashboard',
        // alias: '/',
        component: () => import('../../views/auth/dashboard.vue'),
    },
    {
        name: 'profile-info',
        path: '/profile-info',
        // alias: '/',
        component: () => import('../../views/auth/users/settings.vue'),
        children: [
            {
                path: 'change_image',
                name: 'change_image',
                component: () => import('../../views/auth/users/settings.vue'),

            }
        ]
    },

    {
        name: 'invoices',
        path: '/invoices',
        alias: '/',
        component: () => import('../../views/auth/invoices.vue'),
        children: [
            {
                name: 'add-invoice',
                path: 'add-invoice',
                // alias: '/',
                component: () => import('../../views/auth/invoices.vue'),
            },]
    },

    {
        name: 'courses',
        path: '/courses',
        // alias: '/',
        component: () => import('../../views/auth/courses/allcourses.vue'),
        children: [
            {
                name: 'add-course',
                path: 'add-course',
                // alias: '/',
                component: () => import('../../views/auth/courses/createCourse.vue'),
            },
            {
                name: 'edit-course',
                path: 'edit-course/:id',
                // alias: '/',
                component: () => import('../../views/auth/courses/createCourse.vue'),
                props: (route: { params: { id: string } }) => ({
                    mode: 'edit',
                    id: route.params.id
                })
            },

            {
                name: 'edit-image',
                path: 'edit-image/:id',
                // alias: '/',
                component: () => import('../../views/auth/courses/createCourse.vue'),
                props: (route: { params: { id: string } }) => ({
                    mode: 'edit',
                    id: route.params.id
                })
            },
        ],

    },
    {
        name: 'track',
        path: '/track/:id',
        // alias: '/',
        component: () => import('../../views/auth/tracks/track.vue'),
        props: (route: { params: { id: string } }) => ({
            // mode: 'edit',
            id: route.params.id
        }),
        children: [

            {
                name: 'edit-track-image-track',
                path: 'edit-track-image',
                // alias: '/',
                component: () => import('../../views/auth/tracks/track.vue'),
            },
            {
                name: 'edit-track-track',
                path: 'edit-track',
                // alias: '/',
                component: () => import('../../views/auth/tracks/track.vue'),
            },
            {
                name: 'track-courses',
                path: 'courses',
                // alias: '/',
                component: () => import('../../views/auth/tracks/track.vue'),
            },
            {
                name: 'track-users',
                path: 'learners',
                // alias: '/',
                component: () => import('../../views/auth/tracks/track_learners.vue'),
            },
            {
                name: 'reviews',
                path: 'reviews',
                // alias: '/',
                component: () => import('../../views/auth/tracks/track-reviews.vue'),
            },
        ]
    },
       {
                name: 'reports',
                path: '/reports',
                // alias: '/',
                component: () => import('../../views/auth/report/index.vue'),
                props: (route: { params: { id: string } }) => ({
                    mode: 'edit',
                    id: route.params.id
                })
            },
]



