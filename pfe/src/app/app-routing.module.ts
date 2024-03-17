import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { UserFormComponent } from './user-form/user-form.component';
import { TestComponent } from './test/test.component';
import { LoginComponent } from './core/auth/login/login.component';
import { AuthGuard } from './auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    //     { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    //     { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    //     { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    //     { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    //     { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    //     { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
                    { path: "", loadChildren: () => import('./core/dashboard/dashboard.module').then(m => m.DashboardModule) ,canActivate : [AuthGuard]},
                    {path:'test' ,component : UserFormComponent},
<<<<<<< HEAD
                    { path: "", loadChildren: () => import('./core/dashboard/tickets/tickets-routing.module').then(m => m.DashboardRoutingModule),canActivate : [AuthGuard] },
                    { path: "", loadChildren: () => import('./core/dashboard/administrateur/administrateur-routing.module').then(m => m.AdministrateurRoutingModule),canActivate : [AuthGuard] },
                    { path: "", loadChildren: () => import('./core/dashboard/groupe/groupe-routing.module').then(m => m.GroupeRoutingModule),canActivate : [AuthGuard] },
                    { path: "", loadChildren: () => import('./core/dashboard/equipement-ty/equipement-ty-routing.module').then(m => m.EquipementTyRoutingModule ),canActivate : [AuthGuard] },
=======
                    { path: "", loadChildren: () => import('./core/dashboard/tickets/tickets-routing.module').then(m => m.DashboardRoutingModule) },
                    { path: "", loadChildren: () => import('./core/dashboard/administrateur/administrateur-routing.module').then(m => m.AdministrateurRoutingModule) },
                    { path: "", loadChildren: () => import('./core/dashboard/groupe/groupe-routing.module').then(m => m.GroupeRoutingModule) },
                    { path: "", loadChildren: () => import('./core/dashboard/equipement-ty/equipement-ty-routing.module').then(m => m.EquipementTyRoutingModule ) },
>>>>>>> parent of 61b03b0 (update)

                ]
            },
            {path : "login", component: LoginComponent},

            { path: 'authen', loadChildren: () => import('./core/auth/auth-routing.module').then(m => m.AuthRoutingModule)},

            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
