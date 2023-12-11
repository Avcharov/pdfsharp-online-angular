import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfEditPageComponent } from './pages/pdf-edit-page/pdf-edit-page.component';
import { PdfEditRoutingModule } from './pdf-edit.routing';
import { PdfItemsSidebarComponent } from './components/pdf-items-sidebar/pdf-items-sidebar.component';
import { AddImagePopupComponent } from './components/add-image-popup/add-image-popup.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { PDF_EDIT_ACTION_KEY } from './store/pdf-edit.store';
import { pdfEditReducer } from './store/pdf-edit.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PdfEditEffects } from './store/pdf-edit.effects';
import { PdfEditorViewComponent } from './components/pdf-editor-view/pdf-editor-view.component';
@NgModule({
  imports: [
    CommonModule,
    PdfEditRoutingModule,
    SharedModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(PDF_EDIT_ACTION_KEY, pdfEditReducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([PdfEditEffects]),
  ],
  declarations: [PdfEditPageComponent, PdfItemsSidebarComponent, AddImagePopupComponent, PdfEditorViewComponent]
})
export class PdfEditModule { }
