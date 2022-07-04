import { Injectable, ViewChild, ViewContainerRef } from '@angular/core';
import { AnchorDirective } from '../directives/anchor.directive';
import { FireworksComponent } from '../effects/fireworks/fireworks.component';

@Injectable({
  providedIn: 'root'
})
export class EffectsManagerService {

  fw!: ViewContainerRef;

  @ViewChild(AnchorDirective, { read: ViewContainerRef })
  set firework(value: ViewContainerRef) {
    this.fw = value;
    alert(value)
  }
  

  constructor() {}

  createFirework(): void {
    console.log(this.fw)
    if (!this.fw) return;
    this.fw.clear();
    this.fw.createComponent(FireworksComponent);
  }
}
