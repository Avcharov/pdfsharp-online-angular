import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/features/pdf-edit/models/item';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() name = '';
  @Input() addItemText = '';
  @Input() isSelectOpen = true;
  @Input() items = <Item[]>[];


  constructor() { }

  ngOnInit() {
  }

  toggleSelect() {

  }

  addItem() {

  }

  deleteItem(itemId: number){

  }
}
