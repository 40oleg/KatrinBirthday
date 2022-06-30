import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TuiCarouselComponent } from '@taiga-ui/kit';
import { fromEvent, interval, merge, Observable } from 'rxjs';
import { AnchorDirective } from '../../directives/anchor.directive';
import { ImagePartComponent } from './image-part/image-part.component';

const PUZZLE_FIELD_SIZE = 4;
const CANVAS_SIZE = 400;

enum ToneTypes {
  SMILE = 'smile',
}

type PickingImages = {
  url: string,
}

type Point = {
  x: number,
  y: number,
}

type VectorPointer = {
  active: boolean,
  cellFrom: Point,
  cellTo: Point, 
}

const images: PickingImages[] = [
  { url: 'assets/puzzleImages/forest.jpg' },
  { url: 'assets/puzzleImages/forest.jpg' },
  { url: 'assets/puzzleImages/forest.jpg' },
  { url: 'assets/puzzleImages/forest.jpg' },
]

@Component({
  selector: 'app-puzzle-image',
  templateUrl: './puzzle-image.component.html',
  styleUrls: ['./puzzle-image.component.scss']
})
export class PuzzleImageComponent {

  index: number;

  characterMood: ToneTypes;

  images: PickingImages[];

  puzzleFieldSize: number;

  canv!: HTMLCanvasElement;

  ctx!: CanvasRenderingContext2D;

  step: number;

  vectorPointer: VectorPointer;

  cachedImage!: ImageData; 

  @ViewChild('canvas')
  set canvas(value: ElementRef) {
    this.canv = value.nativeElement;
    this.ctx = value.nativeElement.getContext('2d') as CanvasRenderingContext2D;
  }

  constructor() {
    this.characterMood = ToneTypes.SMILE;
    this.images = images;
    this.index = 0;
    this.puzzleFieldSize = PUZZLE_FIELD_SIZE;
    this.step = CANVAS_SIZE / this.puzzleFieldSize;
    this.vectorPointer = {
      active: false,
      cellFrom: { x: 0, y: 0 },
      cellTo: { x: 0, y: 0 },      
    }
  }

  ngAfterViewInit() {
    this.listenRxEvents(); 
    this.loadImage().then(() => {
      this.cycle();
    })
  }

  async cycle() {
    this.clearCanvas();
    this.drawImage();
    this.drawGrid('#ffffff');
    this.drawVectorPointer();
    // interval(2000).subscribe(() => this.swapCells({x: 1, y: 1}, {x: 3, y: 2}));
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canv.width, this.canv.height)
  }

  fillCanvas(color: string) {
    if (!this.canv) throw Error('canvas has not been found');
    const lastFillStyle = this.ctx.fillStyle; 
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.canv.width, this.canv.height);
    this.ctx.fillStyle = lastFillStyle;
  }

  drawGrid(color: string) {
    if (!this.canv) throw Error('canvas has not been found');
    const lastFillStyle = this.ctx.fillStyle; 
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0)
    for(let i = 0; i < this.puzzleFieldSize+1; i++) {
      this.ctx.lineTo(this.canv.width, i * this.step);
      this.ctx.moveTo(0, (i + 1) * this.step)
    }
    this.ctx.moveTo(0, 0)
    for(let i = 0; i < this.puzzleFieldSize+1; i++) {
      this.ctx.lineTo(i * this.step, this.canv.height);
      this.ctx.moveTo((i + 1) * this.step, 0)
    }
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.strokeStyle = lastFillStyle;
  }

  async loadImage() {
    return new Promise((res, rej) => {
      const img = new Image();
      img.src = '/assets/puzzleImages/forest.jpg';
      img.onload = () => {
        this.ctx.drawImage(img, 0, 0, this.canv.width, this.canv.height);
        this.cachedCanvas();
        res(true);
      }
      img.onerror = () => rej();
    })
  }

  cachedCanvas() {
    this.cachedImage = this.ctx.getImageData(0, 0, this.canv.width, this.canv.height);
  }

  drawImage()  {
    this.ctx.putImageData(this.cachedImage, 0, 0);
  }

  swapCells(cell1: Point, cell2: Point) {
    this.clearCanvas();
    this.drawImage();
    const cell2Data = this.ctx.getImageData(cell2.x*this.step, cell2.y*this.step, this.step, this.step);
    const cell1Data = this.ctx.getImageData(cell1.x*this.step, cell1.y*this.step, this.step, this.step);
    this.ctx.putImageData(cell1Data, cell2.x*this.step, cell2.y*this.step);
    this.ctx.putImageData(cell2Data, cell1.x*this.step, cell1.y*this.step);
    this.cachedCanvas();
  }
  
  listenRxEvents() {
    const mouse$: Observable<MouseEvent> = merge(
      fromEvent(this.canv, 'mousedown'),
      fromEvent(this.canv, 'mouseup'),
      fromEvent(this.canv, 'mousemove'),
      fromEvent(this.canv, 'mouseout'),
    ) as Observable<MouseEvent>;

    mouse$.subscribe((event: MouseEvent) => {
      if (event.type === 'mousedown') {
        this.vectorPointer.active = true;
        this.vectorPointer.cellFrom = this.getCellFromEvent(event);
        return;
      }
      if (event.type === 'mousemove') {
        this.vectorPointer.cellTo = this.getCellFromEvent(event);
        this.cycle();
        return;
      }
      if (event.type === 'mouseup') {
        this.vectorPointer.active = false;
        this.swapCells(this.vectorPointer.cellFrom, this.vectorPointer.cellTo);
        return;
      }
    })
  }

  getCellFromEvent(event: MouseEvent) {
    return {x: Math.floor(event.offsetX / this.step), y: Math.floor(event.offsetY / this.step)}
  }

  drawVectorPointer() {
    this.ctx.beginPath();

    if (!this.vectorPointer.active) return;
    this.ctx.arc(
      this.vectorPointer.cellFrom.x * this.step + this.step / 2,
      this.vectorPointer.cellFrom.y * this.step + this.step / 2,
      20,
      0,
      2 * Math.PI
    );

    this.ctx.arc(
      this.vectorPointer.cellTo.x * this.step + this.step / 2,
      this.vectorPointer.cellTo.y * this.step + this.step / 2,
      20,
      0,
      2 * Math.PI
    );
    
    const lastLineLength = this.ctx.lineWidth;
    this.ctx.lineWidth = 10;
    this.ctx.moveTo(
      this.vectorPointer.cellFrom.x * this.step + this.step / 2,
      this.vectorPointer.cellFrom.y * this.step + this.step / 2,
    );
    this.ctx.lineTo(
      this.vectorPointer.cellTo.x * this.step + this.step / 2,
      this.vectorPointer.cellTo.y * this.step + this.step / 2
    );
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.lineWidth = lastLineLength;

  }

  get ToneTypes(): typeof ToneTypes {
    return ToneTypes;
  }

}
