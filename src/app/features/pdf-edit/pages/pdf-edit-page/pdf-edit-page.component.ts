import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageItem, TextItem } from '../../models/item';
import { Store } from '@ngrx/store';
import { selectImageItems, selectPageNum, selectTextItems } from '../../store/pdf-edit.selector';
import * as _ from 'lodash';
import { PdfEditorViewComponent } from '../../components/pdf-editor-view/pdf-editor-view.component';
import { addImageItemAction, updateImageItemsAction } from '../../store/pdf-edit.actions';
@Component({
  selector: 'app-pdf-edit-page',
  templateUrl: './pdf-edit-page.component.html',
  styleUrls: ['./pdf-edit-page.component.scss'],
})
export class PdfEditPageComponent implements OnInit {

  textItems = <TextItem[]>[];
  imageItems = <ImageItem[]>[];
  selectedPageImages = <ImageItem[]>[];

  pdfDocumentString: string = '';
  pageNum = 1;

  addImagePopupVisible = false;

  constructor(
    private store: Store
  ) { }

  @ViewChild(PdfEditorViewComponent) child!: PdfEditorViewComponent;

  ngOnInit() {
    this.getDataFromStore();
  }

  private getDataFromStore() {
    this.store.select(selectTextItems).subscribe(textItems => this.textItems = _.cloneDeep(textItems));
    this.store.select(selectImageItems).subscribe(imageItems => {
      this.imageItems = _.cloneDeep(imageItems);
      this.selectedPageImages = this.imageItems.filter(i => i.pdfPage === this.pageNum);
      setTimeout(() => {
        this.child.updateImagesAndRender(this.pageNum);
      }, 500);
    });
    this.store.select(selectPageNum).subscribe(pageNum => {
      this.pageNum = _.cloneDeep(pageNum);
    });
  }

  convertToBase64(pdfDocumentString: string) {
    this.child.setPdf(pdfDocumentString);
  }

  addTestImage() {
    this.child.preSetImageSettings();
  }

  addImageFromPopup(imageObj: HTMLImageElement) {
    
    const newItem: ImageItem = {
      id: this.generateId(),
      name: `Image ${this.generateId()}`,
      xPos: 0,
      yPos: 0,
      rotation: 0,
      isHidden: false,
      viewId: 1,
      opacity: 1.0,
      imageWidth: imageObj.width,
      imageHeight: imageObj.height,
      imageRight: 0,
      imageBottom: 0,
      imageObj: imageObj,
      imageName: imageObj.src,
      pdfPage: this.pageNum
    };

    this.store.dispatch(addImageItemAction({ item: newItem }));
    this.closeAddImagePopup();

  }

  pageChanged(event: { pageNum: number, selectedImageItems: ImageItem[] }) {

    const pageNum = event.pageNum;
    const selectedPageImages = event.selectedImageItems;

    // this.imageItems.forEach(i =>
    //   selectedPageImages.forEach(j => { if (i.id === j.id) i = j; })
    // )

    this.store.dispatch(updateImageItemsAction({ newImageItems: selectedPageImages }));

    this.selectedPageImages = this.imageItems.filter(i => i.pdfPage === pageNum);
  }

  updateSelectedItems() {
    this.selectedPageImages = this.imageItems.filter(i => i.pdfPage === this.pageNum);

  }

  openAddImagePopup() {
    this.addImagePopupVisible = true;
  }

  closeAddImagePopup() {
    this.addImagePopupVisible = false;
  }

  private generateId(): number {
    return this.imageItems.length + 1;
  }
}
