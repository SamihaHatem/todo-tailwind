import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'tasks', pathMatch: 'full' },
    { path: 'tasks', loadComponent: () => import('./features/components/all-tasks/all-tasks.component').then((c) => c.AllTasksComponent) },
    { path: 'tasks/:id', loadComponent: () => import('./features/components/new-task/new-task.component').then((c) => c.NewTaskComponent) },
];
