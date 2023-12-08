import { Component, Input, OnInit } from '@angular/core';
import { ImageItem, TextItem } from '../../models/item';

@Component({
  selector: 'app-pdf-items-sidebar',
  templateUrl: './pdf-items-sidebar.component.html',
  styleUrls: ['./pdf-items-sidebar.component.scss']
})
export class PdfItemsSidebarComponent implements OnInit {

  @Input() textItems = <TextItem[]>[];
  @Input() imageItems = <ImageItem[]>[];

  constructor() { }

  ngOnInit() {
  }

}
