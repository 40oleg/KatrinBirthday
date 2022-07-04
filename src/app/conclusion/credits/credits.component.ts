import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss']
})
export class CreditsComponent implements OnInit {

  @ViewChild('main')
  main!: ElementRef<HTMLDivElement>;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.startSlowScroll();
    this.startMusic();
  }

  startSlowScroll() {
    let y = 0;
    interval(10).subscribe(() => {
      y+=0.3;
      this.main.nativeElement.scrollTo(0, y);
    })
  }

  startMusic() {
    const audio = new Audio('./assets/audio/happy-birthday.mp3');
    audio.play();
  }
}
