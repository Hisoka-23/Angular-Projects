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
                loadComponent: () => 
                    import('./pages/main/dashboard/dashboard').then(
                        m => m.Dashboard
                    ),
            },
            {
                path: 'users',
                loadComponent: () => 
                    import('./pages/main/users/users').then(
                        m => m.Users
                ),
            },
            {
                path: 'customer',
                loadComponent: () => 
                    import('./pages/main/mater/customer/customer').then(
                        m => m.Customer
                    ),
            },
            {
                path: 'party',
                loadComponent: () => 
                    import('./pages/main/mater/party/party').then(
                        m => m.Party
                    )
            },
            {
                path: 'eqnuiry',
                loadComponent: () => 
                    import('./pages/main/Transactions/enquiry/enquiry').then(
                        m => m.Enquiry
                    ),
            },
            {
                path: 'support',
                loadComponent: () => 
                    import('./pages/main/Transactions/support/support').then(
                        m => m.Support
                ),
            },
            {
                path: 'customer-list',
                loadComponent: () => 
                    import('./pages/main/view/view-customerList/view-customer-list').then(
                        m => m.ViewCustomerList
                ),
            },
            {
                path: 'import-party',
                loadComponent: () =>
                    import('./pages/main/utilities/import-party/import-party').then(
                        m => m.ImportParty
                    ),
            },
            {
                path: 'emailer',
                loadComponent: () => 
                    import('./pages/main/utilities/emailer/emailer').then(
                        m => m.Emailer
                    )
            },
            
        ],
    }
];
