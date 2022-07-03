import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TuiButtonComponent } from '@taiga-ui/core';
import { timer } from 'rxjs';
import { ScoreService } from 'src/app/services/score.service';

const QUESTION_REWARD = 10;

type QuestionAnswer = {
  question: string,
  answers: [string, string, string, string],
  rightAnswer: string,
}

const QUESTIONS: QuestionAnswer[] = [
  {
    question: 'Как зовут акулу Леры?',
    answers: ['Белкунчик', 'Амурчик', 'Акулкин', 'Акулин'],
    rightAnswer: 'Акулкин'
  },
  {
    question: 'Какой мой любимый цвет?',
    answers: ['Красный', 'Оранжевый', 'Синий', 'Черный'],
    rightAnswer: 'Оранжевый'
  },
  {
    question: 'Как зовут твою игрушку?',
    answers: ['Игрушка', 'Игрушка2', 'Игрушка3', 'Игрушка4'],
    rightAnswer: 'Игрушка2'
  },
] 

enum ToneTypes {
  LITTLE_SMILE = 'little_smile',
  SAD = 'little_smile',
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
    timer(1000).subscribe(() => {
      if (this.answer.value === this.currentQuestion.rightAnswer) {
        this.scoreService.increaseScore(QUESTION_REWARD);
        if(this.checkFinish()) return;
        this.nextQuestion();
      } else {
        this.nextQuestion();
      }
      this.showLoaderButton = false;
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
