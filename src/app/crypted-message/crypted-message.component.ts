import { Component, Injector, OnInit } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { FirstWordComponent } from '../introduction/first-word/first-word.component';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { BehaviorSubject, interval, timer } from 'rxjs';
import { ScoreService } from '../services/score.service';
import { CongratulationsComponent } from '../conclusion/congratulations/congratulations.component';
import { CreditsComponent } from '../conclusion/credits/credits.component';

const MESSAGE = ``;
const INITIAL_LETTERS = 'ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮйцукенгшщзхъфывапролджэячсмитьбюё.,!?"/ ';
const CRYPT_ALPHABET = 'kfTX!+x0.#yhjOu31qLFB=lV92cWKz8pmoD-;JtrvdgUeM5,*^nNsZHQSAi7wC$R6PE4&abY@G%';

@Component({
  selector: 'app-crypted-message',
  templateUrl: './crypted-message.component.html',
  styleUrls: ['./crypted-message.component.scss']
})
export class CryptedMessageComponent implements OnInit {

  /** Начальное незашифрованное сообщение */
  initialMessage: string;

  /** Зашифрованное сообщение */
  cryptedMessage: string;

  /** Словарь замен для шифрования */
  changesDictionary: Map<string, string>;

  /** Коэффициент показывающий какой процент сообщения будет виден в незашифрованном виде */
  decryptedPercentage$: BehaviorSubject<number> = new BehaviorSubject<number>(0.9);

  userScore: number;

  private readonly congratulation = this.dialogService.open(
    new PolymorpheusComponent(CongratulationsComponent, this.injector),
    {
      size: 'l',
      closeable: false,
      dismissible: false,
    }
  );

  private readonly credits = this.dialogService.open(
    new PolymorpheusComponent(CreditsComponent, this.injector),
    {
      size: 'l',
      closeable: false,
      dismissible: false,
    }
  );

  constructor(
    private readonly dialogService: TuiDialogService,
    private readonly injector: Injector,
    private readonly scoreService: ScoreService,
  ) {
    this.changesDictionary = new Map();
    this.fillChangesDictionary();
    this.initialMessage = MESSAGE;
    this.cryptedMessage = '';
    this.userScore = 0;
    this.decryptedPercentage$.subscribe((percent) => {
      this.cryptedMessage = this.cryptMessage(this.initialMessage);
    })
    scoreService.userScore$.subscribe((value: number) => this.userScore = value);
  }

  ngOnInit(): void {

  }

  /** Зашифровать сообщение */
  cryptMessage(message: string): string {
    return message.split('').reduce((acc: string, curr: string) => {
      if(Math.random() > this.decryptedPercentage$.value) {
        acc += this.changesDictionary.get(curr);
      } else {
        acc += curr;
      }
      return acc;
    }, '');
  }

  /** Заполнить словарь замен для шифрования */
  fillChangesDictionary() {
    // const cryptAlphabet = this.shakeArray(CRYPT_ALPHABET.split(''));
    const cryptAlphabet = CRYPT_ALPHABET.split('');
    const letters = INITIAL_LETTERS.split('');
    letters.forEach((letter, index) => {
      this.changesDictionary.set(letter, cryptAlphabet[index]);
    })
  }

  runCongratulation() {
    this.congratulation.subscribe(() => {
        timer(500).subscribe(() => {
          this.credits.subscribe();
        })
    })
  }


}
