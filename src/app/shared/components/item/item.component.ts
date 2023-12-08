import { Component, Input, OnInit } from '@angular/core';
import ImageItem from 'src/app/features/pdf-edit/models/image-item.model';
import { Item } from 'src/app/features/pdf-edit/models/item';
import TextItem from 'src/app/features/pdf-edit/models/text-item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() item! : Item;

  get isTextItem(): boolean {
    return this.item instanceof TextItem;
  }

  get isImageItem() {
    return this.item instanceof ImageItem;
  }

  constructor() { }

  ngOnInit() {
  }


  toggleItem() {

  }

  deleteItem() {

  }

}
