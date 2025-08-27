import { MenuItem } from "../interface/menu-item.interface";

export const MENU_ITEMS = [
    {
        label: 'Dashboard',
        icon: 'bi bi-house',
        route: '/dashboard'
    },
        {
        label: 'Reports',
        icon: 'bi bi-bar-chart-fill',
        route: '',
        submenu:[
            {
                label: 'User Reports',
                icon: 'bi bi-bar-chart-fill',
                route: '',
            },
            {
                label: 'Manager Reports',
                icon: 'bi bi-bar-chart-fill',
                route: '',
            }
        ]
    }
];