import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'bar-chart',
        pathMatch: 'full'
    },
    {
        path: 'bar-chart',
        loadComponent: () => import('./bar-chart/bar-chart').then((m) => m.BarChart)
    }
];
