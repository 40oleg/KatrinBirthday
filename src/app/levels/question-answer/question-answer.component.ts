import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TuiAlertService, TuiButtonComponent, TuiNotification } from '@taiga-ui/core';
import { timer } from 'rxjs';
import { ScoreService } from 'src/app/services/score.service';
import { QuestionAnswer, QUESTIONS } from './Questions';

const QUESTION_REWARD = 10;

enum ToneTypes {
  LITTLE_SMILE = 'little_smile',
  PHENOMINAL = 'phenominal',
  SAD = 'sad',
}

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.scss']
})
export class QuestionAnswerComponent implements OnInit {

  characterMood: ToneTypes;

  answer: FormControl;

  currentQuestion: QuestionAnswer;

  allQuestions: QuestionAnswer[];

  showLoaderButton: boolean;

  constructor(
    private readonly scoreService: ScoreService,
    private readonly alertService: TuiAlertService,
  ) {
    this.characterMood = ToneTypes.LITTLE_SMILE;
    this.answer = new FormControl('');
    this.allQuestions = QUESTIONS;
    this.currentQuestion = this.allQuestions[0];
    this.showLoaderButton = false;
  }

  ngOnInit(): void {
  }

  giveAnswer() {
    this.showLoaderButton = true;
    timer(2000).subscribe(() => {
      if (this.currentQuestion.rightAnswer.includes(this.answer.value)) {
        this.scoreService.increaseScore(QUESTION_REWARD);
        if(this.checkFinish()) return;
        this.nextQuestion();
        this.alertService.open(`Получено ${QUESTION_REWARD} булочек!`, {label: 'Правильный ответ', status: TuiNotification.Success}).subscribe();
        this.characterMood = ToneTypes.PHENOMINAL;
      } else {
        this.nextQuestion();
        this.alertService.open(`Не удалось получить булочек :(`, {label: 'Неправильный ответ', status: TuiNotification.Error}).subscribe();
        this.characterMood = ToneTypes.SAD;
      }
      this.showLoaderButton = false;
      this.answer.patchValue('');
    })
  }

  checkFinish(): boolean {
    return false;
  }

  nextQuestion() {
    let randomQuestion: QuestionAnswer;
    do {
      randomQuestion = this.allQuestions[Math.floor(Math.random()*this.allQuestions.length)];
    } while(randomQuestion.question === this.currentQuestion.question);
    this.currentQuestion = randomQuestion;
  }

  get ToneTypes(): typeof ToneTypes {
    return ToneTypes;
  }

}
