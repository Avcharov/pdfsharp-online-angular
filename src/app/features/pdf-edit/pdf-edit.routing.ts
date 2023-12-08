import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfEditPageComponent } from './pages/pdf-edit-page/pdf-edit-page.component';

const routes: Routes = [
    {
      path: '',
      component: PdfEditPageComponent,
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class PdfEditRoutingModule {}
  