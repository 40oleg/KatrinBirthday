import { Component, ElementRef, EventEmitter, HostListener, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';

type Point = {
  x: number,
  y: number,
}

@Component({
  selector: 'app-image-part',
  templateUrl: './image-part.component.html',
  styleUrls: ['./image-part.component.scss']
})
export class ImagePartComponent implements OnInit {

  @ViewChild('imagePart')
  imagePart: ElementRef | null;

  public position: Point;

  constructor() {
    this.imagePart = null;
    this.position = {
      x: 0,
      y: 0
    }
  }

  startDrag(event: DragEvent) {
    if (!event.dataTransfer) throw new Error('eventTransfer is null');
    event.dataTransfer.setData('cellPosition', JSON.stringify(this.position));
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (!this.imagePart) throw new Error('imagePart is null');
    const dragStart$ = fromEvent(this.imagePart.nativeElement, 'dragstart') as Observable<DragEvent>;
    dragStart$.subscribe((event: DragEvent) => {
      this.startDrag(event)
    })
  }

}
