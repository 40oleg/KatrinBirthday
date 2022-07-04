import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';
import { timer } from 'rxjs';
import { FireworksComponent } from 'src/app/effects/fireworks/fireworks.component';
import { ScoreService } from '../../../../src/app/services/score.service';

@Component({
  selector: 'app-score-counter',
  templateUrl: './score-counter.component.html',
  styleUrls: ['./score-counter.component.scss']
})
export class ScoreCounterComponent implements OnInit {

  /** Счётчик очков, показывается на главном экране */
  scoreCounter: number; 

  @ViewChild('firework', { read: ViewContainerRef })
  firework!: ViewContainerRef;

  constructor(
    private readonly scoreService: ScoreService,
    private readonly alertService: TuiAlertService,
  ) {
    this.scoreCounter = 0;
    scoreService.userScore$.subscribe((score: number) => {
      this.scoreCounter = score;
      if (this.scoreCounter >= 100) {
        this.startFirework();
      }
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  startFirework(): void {
    this.firework.clear();
    const ref = this.firework.createComponent(FireworksComponent);
    this.alertService
      .open('Ты набрала нужное количество булочек чтобы увидеть поздравление!', {label: 'Поздравляю!'})
      .subscribe();
      timer(10000).subscribe(() => {
        this.alertService
          .open('Но если хочешь можешь ещё поотвечать на вопросики...', {label: 'Пасхалка'})
          .subscribe();
      })
      timer(30000).subscribe(() => {
        this.alertService
          .open('Завершаю салют...', {label: 'Завершение салюта'})
          .subscribe();
        ref.destroy();
      })
    
  }

}
