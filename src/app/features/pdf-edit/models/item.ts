interface ItemInterface {
    id: number,
    name: string,
    xPos: number,
    yPos: number,
    rotation: number,
    isHidden: boolean,
    viewId: number
}

export interface TextItem extends ItemInterface {
    fontSize: number,
    isBold: boolean,
    isCursive: boolean,
    isUnderlined: boolean,
}

export interface ImageItem extends ItemInterface {
    opacity: number,
    imageWidth: number,
    imageHeight: number,
    imageRight: number,
    imageBottom: number,
    imageObj: HTMLImageElement,
    imageName: string,
    pdfPage: number
}

export type Item = ImageItem | TextItem;
