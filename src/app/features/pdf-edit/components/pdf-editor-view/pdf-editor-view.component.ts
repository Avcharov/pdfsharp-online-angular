import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ImageItem, TextItem } from '../../models/item';
import * as pdfjsLib from 'pdfjs-dist';

@Component({
  selector: 'app-pdf-editor-view',
  templateUrl: './pdf-editor-view.component.html',
  styleUrls: ['./pdf-editor-view.component.scss']
})
export class PdfEditorViewComponent {

  @Input() textItems: TextItem[] = [];
  @Input() imageItems: ImageItem[] = [];

  name = 'Angular';
  private pdfDoc: any;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;

  pdfurl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

  constructor() { }

  // async showPdf() {
  //   const loadingTask = pdfjsLib.getDocument(this.pdfurl);
  //   this.pdfDoc = await loadingTask.promise.then();
  //   console.log(this.pdfDoc);
    
  // }

  // ngOnInit(): void {
  //   this.showPdf();
  // }

}
