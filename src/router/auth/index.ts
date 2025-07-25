export default [
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
        alias: '/',
        component: () => import('../../views/auth/dashboard.vue'),
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
        path: 'track/:id',
        // alias: '/',
        component: () => import('../../views/auth/tracks/track.vue'),
        props: (route: { params: { id: string } }) => ({
            // mode: 'edit',
            id: route.params.id
        })
    },
]