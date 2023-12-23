import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageItem, TextItem } from '../../models/item';
import { Store } from '@ngrx/store';
import { selectImageItems, selectPageNum, selectTextItems } from '../../store/pdf-edit.selector';
import * as _ from 'lodash';
import { PdfEditorViewComponent } from '../../components/pdf-editor-view/pdf-editor-view.component';
@Component({
  selector: 'app-pdf-edit-page',
  templateUrl: './pdf-edit-page.component.html',
  styleUrls: ['./pdf-edit-page.component.scss'],
})
export class PdfEditPageComponent implements OnInit {

  textItems = <TextItem[]>[];
  imageItems = <ImageItem[]>[];

  pdfDocumentString: string = '';
  pageNum = 1;

  constructor(
    private store: Store
  ) { }

  @ViewChild(PdfEditorViewComponent) child!: PdfEditorViewComponent;

  ngOnInit() {
    this.getDataFromStore();
  }

  private getDataFromStore() {
    this.store.select(selectTextItems).subscribe(textItems => this.textItems = _.cloneDeep(textItems));
    this.store.select(selectImageItems).subscribe(imageItems => this.imageItems = _.cloneDeep(imageItems));
    this.store.select(selectPageNum).subscribe(pageNum => this.pageNum = _.cloneDeep(pageNum));
  }

  convertToBase64(pdfDocumentString: string) {
    this.child.setPdf(pdfDocumentString);
  }

  addImage() {
    this.child.preSetImageSettings();
  }
}
