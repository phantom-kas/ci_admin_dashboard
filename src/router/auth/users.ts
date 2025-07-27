export default [
    {
        name: 'usersBase',
        path: '/usersBase',
        // alias: ['user'],
        // type is learners or admin
        component: () => import('../../views/auth/users/index.vue'),
        props: (route: { params: { type: string } }) => ({
            id: route.params.type
        }),
        children: [
            {
                name: 'users',
                path: '/users/:type',
                // alias: ['user'],
                // type is learners or admin
                component: () => import('../../views/auth/users/allusers.vue'),
                props: (route: { params: { type: string } }) => ({
                    type: route.params.type
                }),
                children: [
                    {
                        name: 'add-user',
                        path: 'add-user',
                        // alias: '/',
                        component: () => import('../../views/auth/users/allusers.vue'),
                    },
                    {
                        name: 'edit-user-image',
                        path: 'edit-user-image/:id',
                        // alias: '/',
                        props: (route: { params: { id: string } }) => ({

                            id: route.params.id
                        }),
                        component: () => import('../../views/auth/users/allusers.vue'),
                    },
                    {
                        name: 'edit-user',
                        path: 'edit-user/:id',
                        // alias: '/',
                        props: (route: { params: { id: string } }) => ({

                            id: route.params.id
                        }),
                        component: () => import('../../views/auth/users/allusers.vue'),
                    },
                     {
                        name: 'user-user',
                        path: 'user=:id',
                        // alias: '/',
                        props: (route: { params: { id: string } }) => ({

                            id: route.params.id
                        }),
                        component: () => import('../../views/auth/users/allusers.vue'),
                    },
                ]
            },
        ]
    }
]