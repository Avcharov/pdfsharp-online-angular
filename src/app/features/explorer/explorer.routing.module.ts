import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExplorerPageComponent } from './pages/explorer-page/explorer-page.component';

const routes: Routes = [
    {
      path: '',
      component: ExplorerPageComponent,
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class ExplorerRoutingModule {}
  