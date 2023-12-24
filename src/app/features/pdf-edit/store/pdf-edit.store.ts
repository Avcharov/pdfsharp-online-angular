import { ImageItem, TextItem } from '../models/item';

export const PDF_EDIT_ACTION_KEY = '[PDF-EDIT]';

export interface PdfEditState {
  textItems: TextItem[];
  imageItems: ImageItem[];
  pageNum: number
}

export const initialPdfEditState: PdfEditState = {
  textItems: [
    {
      id: 1,
      name: 'Text Item 1',
      xPos: 10,
      yPos: 20,
      rotation: 30,
      isHidden: true,
      viewId: 100,
      fontSize: 16,
      isBold: true,
      isCursive: false,
      isUnderlined: true,
    },
    {
      id: 2,
      name: 'Text Item 2',
      xPos: 30,
      yPos: 40,
      rotation: 60,
      isHidden: true,
      viewId: 101,
      fontSize: 18,
      isBold: false,
      isCursive: true,
      isUnderlined: false,
    },
    {
      id: 3,
      name: 'Text Item 3',
      xPos: 50,
      yPos: 60,
      rotation: 90,
      isHidden: true,
      viewId: 102,
      fontSize: 14,
      isBold: true,
      isCursive: true,
      isUnderlined: false,
    },
  ],
  imageItems: [
    {
      id: 1,
      name: 'Image Item 1',
      xPos: 70,
      yPos: 80,
      rotation: 120,
      isHidden: true,
      viewId: 103,
      opacity: 0.8,
      imageWidth: 0,
      imageHeight: 0,
      imageRight: 0 ,
      imageBottom: 0,
      imageObj: new Image() as HTMLImageElement,
      imageName: '../../../../../assets/kpi.png',
      pdfPage: 1
    },
    {
      id: 2,
      name: 'Image Item 2',
      xPos: 220,
      yPos: 200,
      rotation: 150,
      isHidden: true,
      viewId: 104,
      opacity: 0.6,
      imageWidth: 0,
      imageHeight: 0,
      imageRight: 0 ,
      imageBottom: 0,
      imageObj: new Image() as HTMLImageElement,
      imageName: '../../../../../assets/code.png',
      pdfPage: 2
    },
    {
      id: 3,
      name: 'Image Item 3',
      xPos: 110,
      yPos: 120,
      rotation: 180,
      isHidden: true,
      viewId: 105,
      opacity: 1.0,
      imageWidth: 0,
      imageHeight: 0,
      imageRight: 0 ,
      imageBottom: 0,
      imageObj: new Image() as HTMLImageElement,
      imageName: '../../../../../assets/code.png',
      pdfPage: 1
    },
  ],
  pageNum: 1
};
