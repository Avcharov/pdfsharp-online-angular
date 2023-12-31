import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
