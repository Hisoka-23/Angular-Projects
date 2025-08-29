import { MenuItem } from "../interface/menu-item.interface";

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
        label: 'Reports',
        // icon: 'bi bi-bar-chart-fill',
        icon: 'fas fa-chart-column',
        route: '',
        submenu: [
            {
                label: 'User Reports',
                icon: 'bi bi-bar-chart-fill',
                route: 'user-reports',
            },
            {
                label: 'Manager Reports',
                icon: 'bi bi-bar-chart-fill',
                route: 'manager-reports',
            }
        ]
    }
];