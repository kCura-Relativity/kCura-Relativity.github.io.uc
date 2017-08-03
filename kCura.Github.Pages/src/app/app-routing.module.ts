import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Root } from './components/root';

import { BootstrapGuard } from './guards';

export const appRoutes: Routes = [
    {
        path: '',
        component: Root,
        canActivate: [BootstrapGuard],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'home' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [ Root ];