import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo:'app',
        pathMatch: 'full'
    },
    {
        path: 'app',
        loadComponent: () => import('./pages/portal-layout/portal-layout').then(m => m.PortalLayout),
        children:[
            {
                path: '',
                redirectTo:'/app/dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/main/dashboard/dashboard').then(m => m.Dashboard),
            },
        ],
    }
];
