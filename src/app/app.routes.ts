import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'tasks', pathMatch: 'full' },
    { path: 'tasks', loadComponent: () => import('./features/components/all-tasks/all-tasks.component').then((c) => c.AllTasksComponent) },
    { path: 'tasks/:id', loadComponent: () => import('./features/components/new-task/new-task.component').then((c) => c.NewTaskComponent) },
    {
        path: '', loadComponent: () => import('./features/components/auth/layout/layout.component').then((c) => c.LayoutComponent), children: [
            { path: 'login', loadComponent: () => import('./features/components/auth/login/login.component').then((c) => c.LoginComponent) },
            { path: 'register', loadComponent: () => import('./features/components/auth/register/register.component').then((c) => c.RegisterComponent) }
        ]
    },

];
