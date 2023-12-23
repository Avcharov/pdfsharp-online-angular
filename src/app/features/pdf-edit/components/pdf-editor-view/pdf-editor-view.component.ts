import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ImageItem, TextItem } from '../../models/item';
import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

@Component({
  selector: 'app-pdf-editor-view',
  templateUrl: './pdf-editor-view.component.html',
  styleUrls: ['./pdf-editor-view.component.scss']
})
export class PdfEditorViewComponent implements AfterViewInit {

  @Input() textItems: TextItem[] = [];
  @Input() imageItems: ImageItem[] = [];
  @Input() pageNum = 1;

  @Output() setPageNumEvent = new EventEmitter<number>();

  @ViewChild("myCanvas", { static: false }) canvas!: ElementRef;
  @ViewChild("drawCanvas", { static: false }) drawCanvas!: ElementRef;

  pdfDoc?: pdfjsLib.PDFDocumentProxy;
  pageRendering = false;
  pageNumPending: number | null = 0;
  scale = 1;

  pdfScale = 80;
  ctx: any;
  pdfCtx: any;

  imageObj = new Image();
  imageName = "../../../../../assets/kpi.png";

  imageX = 0;
  imageY = 0;

  imageWidth = 0;
  imageHeight = 0;
  imageRight = 0;
  imageBottom = 0;

  // Add variables for image dragging and resizing
  isDragging = false;

  private startX: number = 0;
  private startY: number = 0;
  private isDown: boolean = false;
  private draggingResizer: number = -1;
  private draggingImage: boolean = false;
  private mouseX: number = 0;
  private mouseY: number = 0;

  canvasOffset: any;
  offsetX = 0;
  offsetY = 0;

  constructor() { }

  ngAfterViewInit() {
    this.ctx = this.drawCanvas.nativeElement.getContext('2d');
    this.imageObj.src = this.imageName;
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.webkitImageSmoothingEnabled = false;
    this.ctx.mozImageSmoothingEnabled = false;
  }

  preSetImageSettings() {
    this.imageWidth = this.imageObj.width;
    this.imageHeight = this.imageObj.height;

    while (this.imageWidth > this.pdfCtx.canvas.clientWidth * 0.7 ||
      this.imageHeight > this.pdfCtx.canvas.clientHeight * 0.7
    ) {
      this.imageWidth *= 0.5;
      this.imageHeight *= 0.5;
    }

    this.imageRight = this.imageX + this.imageWidth;
    this.imageBottom = this.imageY + this.imageHeight;
    this.draw(true, false);
  }

  // Add event handlers for image dragging and resizing
  handleMouseDown(e: MouseEvent) {
    this.startX = e.clientX - this.offsetX;
    this.startY = e.clientY - this.offsetY;

    this.draggingResizer = this.anchorHitTest(this.startX, this.startY);
    this.draggingImage = this.draggingResizer < 0 && this.hitImage(this.startX, this.startY);
    this.isDown = true;
  }

  handleMouseUp(e: MouseEvent) {
    this.draggingResizer = -1;
    this.draggingImage = false;
    this.isDown = false;
    this.draw(true, false);
  }

  handleMouseOut(e: MouseEvent) {
    this.handleMouseUp(e);
  }

  // Method to handle mouse move event
  handleMouseMove(e: MouseEvent) {
    if (!this.isDown) return;

    if (this.draggingResizer > -1) {
      this.mouseX = e.clientX - this.offsetX;
      this.mouseY = e.clientY - this.offsetY;

      // Resize the image
      switch (this.draggingResizer) {
        case 0:
          // top-left
          this.imageX = this.mouseX;
          this.imageWidth = this.imageRight - this.mouseX;
          this.imageY = this.mouseY;
          this.imageHeight = this.imageBottom - this.mouseY;
          break;
        case 1:
          // top-right
          this.imageY = this.mouseY;
          this.imageWidth = this.mouseX - this.imageX;
          this.imageHeight = this.imageBottom - this.mouseY;
          break;
        case 2:
          // bottom-right
          this.imageWidth = this.mouseX - this.imageX;
          this.imageHeight = this.mouseY - this.imageY;
          break;
        case 3:
          // bottom-left
          this.imageX = this.mouseX;
          this.imageWidth = this.imageRight - this.mouseX;
          this.imageHeight = this.mouseY - this.imageY;
          break;
      }

      if (this.imageWidth < 25) { this.imageWidth = 25; }
      if (this.imageHeight < 25) { this.imageHeight = 25; }

      // Set the image right and bottom
      this.imageRight = this.imageX + this.imageWidth;
      this.imageBottom = this.imageY + this.imageHeight;

      // Redraw the image with resizing anchors
      this.draw(true, true);

    } else if (this.draggingImage) {
      this.mouseX = e.clientX - this.offsetX;
      this.mouseY = e.clientY - this.offsetY;

      // Move the image by the amount of the latest drag
      const dx = this.mouseX - this.startX;
      const dy = this.mouseY - this.startY;
      this.imageX += dx;
      this.imageY += dy;
      this.imageRight += dx;
      this.imageBottom += dy;
      // Reset the startXY for next time
      this.startX = this.mouseX;
      this.startY = this.mouseY;

      // Redraw the image with border
      this.draw(false, true);
    }
  }

  // Method to draw the image on the canvas
  draw(withAnchors: boolean, withBorders: boolean) {
    // Clear the canvas
    this.ctx.clearRect(0, 0, this.drawCanvas.nativeElement.width, this.drawCanvas.nativeElement.height);

    // Draw the image
    this.ctx.drawImage(
      this.imageObj,
      0, 0, this.imageObj.width, this.imageObj.height, this.imageX, this.imageY, this.imageWidth, this.imageHeight
    );


    // Optionally draw the draggable anchors
    if (withAnchors) {
      this.drawDragAnchor(this.imageX, this.imageY);
      this.drawDragAnchor(this.imageRight, this.imageY);
      this.drawDragAnchor(this.imageRight, this.imageBottom);
      this.drawDragAnchor(this.imageX, this.imageBottom);
    }

    // Optionally draw the connecting anchor lines
    if (withBorders) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.imageX, this.imageY);
      this.ctx.lineTo(this.imageRight, this.imageY);
      this.ctx.lineTo(this.imageRight, this.imageBottom);
      this.ctx.lineTo(this.imageX, this.imageBottom);
      this.ctx.closePath();
      this.ctx.stroke();
    }
  }

  // Method to draw a single draggable anchor
  drawDragAnchor(x: number, y: number) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, 8, 0, Math.PI * 2, false);
    this.ctx.closePath();
    this.ctx.fill();
  }

  // Method to check if a point is inside a resizing anchor
  anchorHitTest(x: number, y: number): number {
    let dx = x - this.imageX;
    let dy = y - this.imageY;

    if (dx * dx + dy * dy <= 64) {
      return 0; // top-left
    }

    dx = x - this.imageRight;
    dy = y - this.imageY;

    if (dx * dx + dy * dy <= 64) {
      return 1; // top-right
    }

    dx = x - this.imageRight;
    dy = y - this.imageBottom;

    if (dx * dx + dy * dy <= 64) {
      return 2; // bottom-right
    }

    dx = x - this.imageX;
    dy = y - this.imageBottom;

    if (dx * dx + dy * dy <= 64) {
      return 3; // bottom-left
    }

    return -1; // not inside any anchor
  }

  // Method to check if a point is inside the image
  hitImage(x: number, y: number): boolean {
    return x > this.imageX && x < this.imageX + this.imageWidth &&
      y > this.imageY && y < this.imageY + this.imageHeight;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  setPdf(pdfDocument: string) {
    this.pageNum = 1;
    var loadingTask = pdfjsLib.getDocument({ data: atob(pdfDocument) });
    loadingTask.promise.then(pdf => {
      this.pdfDoc = pdf;
      this.renderPage(this.pageNum);
    });
  }

  renderPage(pageNum: number) {
    if (pageNum !== 0) {
      this.pageRendering = true;
      // Using promise to fetch the page
      this.pdfDoc!.getPage(pageNum).then((page) => {
        var viewport = page.getViewport({ scale: this.scale });
        this.canvas.nativeElement.height = viewport.height;
        this.canvas.nativeElement.width = viewport.width;

        this.drawCanvas.nativeElement.height = viewport.height;
        this.drawCanvas.nativeElement.width = viewport.width;

        // this.
        this.pdfCtx = this.canvas.nativeElement.getContext("2d");
        this.pdfCtx.imageSmoothingEnabled = false;
        this.pdfCtx.webkitImageSmoothingEnabled = false;
        this.pdfCtx.mozImageSmoothingEnabled = false;
    
        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: this.pdfCtx,
          viewport: viewport
        };
        var renderTask = page.render(renderContext);

        // Wait for rendering to finish
        renderTask.promise.then(() => {
          this.pageRendering = false;
          if (this.pageNumPending !== null) {
            // New page rendering is pending
            this.renderPage(this.pageNumPending);
            this.pageNumPending = null;
          }
        });
      });

      // Update page counters
      document.getElementById('page_num')!.textContent = pageNum.toString();

      var canvasElement = document.getElementById("myCanvas")!;
      this.canvasOffset = {
        top: canvasElement.offsetTop,
        left: canvasElement.offsetLeft
      };
      this.offsetX = this.canvasOffset.left - 8;
      this.offsetY = this.canvasOffset.top + 115;
    }
  }

  queueRenderPage(num: number) {
    if (this.pageRendering) {
      this.pageNumPending = num;
    } else {
      this.renderPage(num);
    }
  }

  nextPage() {
    if (this.pageNum >= this.pdfDoc!.numPages) {
      return;
    }

    this.setPageNumEvent.emit(++this.pageNum);
    this.queueRenderPage(this.pageNum);
  }

  prevPage() {
    if (this.pageNum <= 1) {
      return;
    }

    this.setPageNumEvent.emit(--this.pageNum);
    this.queueRenderPage(this.pageNum);
  }

  zoomOut() {
    this.pdfScale -= 10;
    //this.draw(false, false);
  }

  zoomIn() {
    this.pdfScale += 10;
  }
}