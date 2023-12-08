import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfEditPageComponent } from './pages/pdf-edit-page/pdf-edit-page.component';
import { PdfEditRoutingModule } from './pdf-edit.routing';
import { PdfItemsSidebarComponent } from './components/pdf-items-sidebar/pdf-items-sidebar.component';
import { AddImagePopupComponent } from './components/add-image-popup/add-image-popup.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    PdfEditRoutingModule,
    SharedModule
  ],
  declarations: [PdfEditPageComponent, PdfItemsSidebarComponent, AddImagePopupComponent]
})
export class PdfEditModule { }
