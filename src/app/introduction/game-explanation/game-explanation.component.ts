import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { TuiButtonComponent, TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { BehaviorSubject, timer } from 'rxjs';

@Component({
  selector: 'app-game-explanation',
  templateUrl: './game-explanation.component.html',
  styleUrls: ['./game-explanation.component.scss']
})
export class GameExplanationComponent implements OnInit {

  isLoading$: BehaviorSubject<boolean>;

  constructor(
    @Inject(TuiDialogService) 
    private readonly dialogService: TuiDialogService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<number, undefined>,
  ) {
    this.isLoading$ = new BehaviorSubject<boolean>(false);
  }

  ngOnInit(): void {
  }

  submit(value: number) {
    this.isLoading$.next(true);
    timer(500).subscribe(() => {
      this.context.completeWith(value)
      this.isLoading$.next(false);
    })
  }
}
