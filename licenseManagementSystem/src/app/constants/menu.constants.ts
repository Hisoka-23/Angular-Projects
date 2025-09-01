export const MENU_ITEMS = [
    {
        label: 'Dashboard',
        icon: 'bi bi-house',
        route: 'dashboard'
    },
    {
        label: 'Users',
        icon: 'bi bi-people',
        route: 'users'
    },
    {
        label: 'Master',
        // icon: 'bi bi-bar-chart-fill',
        icon: 'fa-solid fa-user-tie',
        route: '',
        submenu: [
            {
                label: 'Customer',
                icon: 'fa-solid fa-user',
                route: 'customer',
            },
            {
                label: 'Party',
                icon: 'fa-solid fa-people-line',
                route: 'party',
            }
        ]
    },
    {
        label: 'Transactions',
        // icon: 'bi bi-bar-chart-fill',
        icon: 'fa-solid fa-repeat',
        route: '',
        submenu: [
            {
                label: 'Enquiry',
                icon: 'fa-regular fa-bell',
                route: 'eqnuiry',
            },
            {
                label: 'Support',
                icon: 'fa-solid fa-headset',
                route: 'support',
            }
        ]
    },
    {
        label: 'View',
        // icon: 'bi bi-bar-chart-fill',
        icon: 'fa-solid fa-expand',
        route: '',
        submenu: [
            {
                label: 'Customer List',
                icon: 'fa-solid fa-list',
                route: 'customer-list',
            },
        ]
    },
    {
        label: 'Utilities',
        // icon: 'bi bi-bar-chart-fill',
        icon: 'fa-solid fa-gear',
        route: '',
        submenu: [
            {
                label: 'Import Party',
                icon: 'fa-solid fa-file-import',
                route: 'import-party',
            },
            {
                label: 'Emailer',
                icon: 'fa-solid fa-envelope',
                route: 'emailer'
            }
        ]
    },
   

];