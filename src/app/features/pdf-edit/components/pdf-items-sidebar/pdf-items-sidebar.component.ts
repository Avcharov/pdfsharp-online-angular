import { Component, Input, OnInit } from '@angular/core';
import { ImageItem, TextItem } from '../../models/item';
import { Store } from '@ngrx/store';
import {
  deleteImageItemAction,
  deleteTextItemAction,
} from '../../store/pdf-edit.actions';

@Component({
  selector: 'app-pdf-items-sidebar',
  templateUrl: './pdf-items-sidebar.component.html',
  styleUrls: ['./pdf-items-sidebar.component.scss'],
})
export class PdfItemsSidebarComponent implements OnInit {
  @Input() textItems = <TextItem[]>[];
  @Input() imageItems = <ImageItem[]>[];

  constructor(private store: Store) {}

  ngOnInit() {}

  deleteTextItem(itemId: number) {
    this.store.dispatch(deleteTextItemAction({ itemId }));
  }

  deleteImageItem(itemId: number) {
    this.store.dispatch(deleteImageItemAction({ itemId }));
  }
}
