import { Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TuiCarouselComponent } from '@taiga-ui/kit';
import { fromEvent, merge, Observable } from 'rxjs';
import { AnchorDirective } from '../../directives/anchor.directive';
import { ImagePartComponent } from './image-part/image-part.component';

const PUZZLE_FIELD_SIZE = 5;

enum ToneTypes {
  SMILE = 'smile',
}

type PickingImages = {
  url: string,
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
export class PuzzleImageComponent implements OnInit {

  index: number;

  characterMood: ToneTypes;

  images: PickingImages[];

  puzzleFieldSize: unknown[];

  @ViewChild(AnchorDirective, {static: true})
  spawner!: AnchorDirective;

  @ViewChildren('cellPart')
  cellParts: QueryList<ElementRef> | null;

  // @ViewChild('carousel')
  // carousel!: TuiCarouselComponent;

  // @HostListener('window:keydown', ['$event'])
  // changeSlide(event: KeyboardEvent) {
  //   if (this.carousel === null) throw Error('carousel is null');
  //   if (event.key === 'ArrowLeft') this.carousel.prev();
  //   if (event.key === 'ArrowRight') this.carousel.next();
  // }

  constructor() {
    this.characterMood = ToneTypes.SMILE;
    this.images = images;
    this.index = 0;
    this.puzzleFieldSize = new Array(PUZZLE_FIELD_SIZE);
    this.cellParts = null;
  }

  ngOnInit(): void {
    this.spawner.viewContainerRef.clear();
    const componentRef = this.spawner.viewContainerRef.createComponent<ImagePartComponent>(ImagePartComponent);
    componentRef.instance.position = {
      x: 4,
      y: 3,
    }
  }

  ngAfterViewInit(): void {
    if (!this.cellParts) throw new Error('imagePart is null');
    let dragEnd$ = new Observable<DragEvent>();
    this.cellParts.toArray().forEach((item: ElementRef) => {
      dragEnd$ = merge(dragEnd$, fromEvent(item.nativeElement, 'dragover') as Observable<DragEvent>); 
      dragEnd$ = merge(dragEnd$, fromEvent(item.nativeElement, 'drop') as Observable<DragEvent>); 
    })
    dragEnd$.subscribe((event: DragEvent) => {
      if (event.type === 'dragover') {
        event.preventDefault();
        return;
      }
      console.log(event.dataTransfer?.getData('cellPosition'))
    })
  }

  get ToneTypes(): typeof ToneTypes {
    return ToneTypes;
  }

  log(event: DragEvent) {
    console.log(event)
  }

}
