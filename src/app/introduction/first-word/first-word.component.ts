import { Component, ComponentFactoryResolver, ElementRef, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-first-word',
  templateUrl: './first-word.component.html',
  styleUrls: ['./first-word.component.scss']
})
export class FirstWordComponent implements OnInit {

  constructor(
    @Inject(TuiDialogService) 
    private readonly dialogService: TuiDialogService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<void, undefined>,
  ) { }

  ngOnInit(): void {
  }

  submit() {
    this.context.completeWith();
  }

}
