import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  userScore$: BehaviorSubject<number>;

  constructor() {
    this.userScore$ = new BehaviorSubject<number>(101);
  }

  increaseScore(value: number): void {
    this.userScore$.next(this.userScore$.value + value);
  }
}
