import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './features/authentication/guards/auth.guard';

const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () =>
      import('./features/welcome/welcome.module').then((m) => m.WelcomeModule),
  },
  {
    path: 'editor',
    loadChildren: () =>
      import('./features/pdf-edit/pdf-edit.module').then((m) => m.PdfEditModule),
    canActivate: [AuthGuard],

  },
  {
    path: 'authentication',
    loadChildren: () =>
      import('./features/authentication/authentication.module').then((m) => m.AuthenticationModule),
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
