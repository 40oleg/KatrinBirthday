import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { TuiButtonComponent, TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { timer } from 'rxjs';

@Component({
  selector: 'app-fake-load-congratulations',
  templateUrl: './fake-load-congratulations.component.html',
  styleUrls: ['./fake-load-congratulations.component.scss']
})
export class FakeLoadCongratulationsComponent implements OnInit {

  @ViewChild('loadButton')
  loadButton: TuiButtonComponent | null;

  constructor(
    @Inject(TuiDialogService) 
    private readonly dialogService: TuiDialogService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<void, undefined>,
  ) {
    this.loadButton = null;
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.loadButton) {
      this.loadButton.disabled = true;
      this.loadButton.showLoader = true;
      timer(500).subscribe(() => this.context.completeWith())
    }
  }

}
