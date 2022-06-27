import { ComponentFactoryResolver, Injectable, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { ToastrComponent } from '../controls/toastr/toastr.component';
import { AnchorDirective } from '../directives/anchor.directive';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  @ViewChild(AnchorDirective, {static: true}) insertPoint!: AnchorDirective;

  constructor(
    private readonly componentFactory: ComponentFactoryResolver,
    private readonly injector: Injector,
    private readonly view: ViewContainerRef
  ) {

  }

  ngAfterViewInit() {
    if (!this.insertPoint) return;

    const viewContainerRef = this.insertPoint.viewContainerRef;
    viewContainerRef.clear();

    viewContainerRef.createComponent<ToastrComponent>(ToastrComponent);

  }

}
