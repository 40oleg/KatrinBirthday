import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { TuiCarouselComponent } from '@taiga-ui/kit';

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

  @ViewChild('carousel')
  carousel!: TuiCarouselComponent;

  @HostListener('window:keydown', ['$event'])
  changeSlide(event: KeyboardEvent) {
    if (this.carousel === null) throw Error('carousel is null');
    if (event.key === 'ArrowLeft') this.carousel.prev();
    if (event.key === 'ArrowRight') this.carousel.next();
  }

  constructor() {
    this.characterMood = ToneTypes.SMILE;
    this.images = images;
    this.index = 0;
  }

  ngOnInit(): void {
  }

  get ToneTypes(): typeof ToneTypes {
    return ToneTypes;
  }

}
