import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../../../../src/app/services/score.service';

@Component({
  selector: 'app-score-counter',
  templateUrl: './score-counter.component.html',
  styleUrls: ['./score-counter.component.scss']
})
export class ScoreCounterComponent implements OnInit {

  /** Счётчик очков, показывается на главном экране */
  scoreCounter: number; 

  constructor(
    private readonly scoreService: ScoreService,
  ) {
    this.scoreCounter = 0;
    scoreService.userScore$.subscribe((score: number) => this.scoreCounter = score);
  }

  ngOnInit(): void {
  }

}
