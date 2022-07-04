import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { timer } from 'rxjs';

@Component({
  selector: 'app-congratulations',
  templateUrl: './congratulations.component.html',
  styleUrls: ['./congratulations.component.scss']
})
export class CongratulationsComponent implements OnInit {

  @ViewChild('video')
  video!: ElementRef<HTMLVideoElement>;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<void, void>,
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.video.nativeElement.play();
    this.video.nativeElement.onended = this.showLastMessage.bind(this); 
  }

  showLastMessage(): void {
    timer(1000).subscribe(() => this.context.completeWith());
  }
}
