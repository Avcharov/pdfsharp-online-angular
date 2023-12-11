import { Component, OnInit } from '@angular/core';
import { ImageItem, TextItem } from '../../models/item';
import { Store } from '@ngrx/store';
import { selectImageItems, selectTextItems } from '../../store/pdf-edit.selector';
import * as _ from 'lodash';
@Component({
  selector: 'app-pdf-edit-page',
  templateUrl: './pdf-edit-page.component.html',
  styleUrls: ['./pdf-edit-page.component.scss'],
})
export class PdfEditPageComponent implements OnInit {

  textItems = <TextItem[]>[];
  imageItems = <ImageItem[]>[];

  constructor(
    private store: Store
  ) {}

  ngOnInit() {
    this.getDataFromStore();
  }

  private getDataFromStore() {
    this.store.select(selectTextItems).subscribe(textItems => this.textItems = _.cloneDeep(textItems));
    this.store.select(selectImageItems).subscribe(imageItems => this.imageItems = _.cloneDeep(imageItems))
  }
}
