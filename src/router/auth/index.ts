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
        component: () => import('../../views/auth/tracks/track.vue'),
        children: [
            {
                name: 'add-track',
                path: 'add-track',
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
        ]
    }
]