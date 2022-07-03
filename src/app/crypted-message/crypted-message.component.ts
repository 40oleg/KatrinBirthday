import { Component, Injector, OnInit } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { FirstWordComponent } from '../introduction/first-word/first-word.component';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { BehaviorSubject, interval } from 'rxjs';

const MESSAGE = `В этот день я хочу пожелать тебе всего самого хорошего и отличного, много радостных эмоций и большого счастья!
В этот день я хочу пожелать тебе всего самого хорошего и отличного, много радостных эмоций и большого счастья!
В этот день я хочу пожелать тебе всего самого хорошего и отличного, много радостных эмоций и большого счастья!
В этот день я хочу пожелать тебе всего самого хорошего и отличного, много радостных эмоций и большого счастья!
В этот день я хочу пожелать тебе всего самого хорошего и отличного, много радостных эмоций и большого счастья!
В этот день я хочу пожелать тебе всего самого хорошего и отличного, много радостных эмоций и большого счастья!
В этот день я хочу пожелать тебе всего самого хорошего и отличного, много радостных эмоций и большого счастья!
В этот день я хочу пожелать тебе всего самого хорошего и отличного, много радостных эмоций и большого счастья!
В этот день я хочу пожелать тебе всего самого хорошего и отличного, много радостных эмоций и большого счастья!
В этот день я хочу пожелать тебе всего самого хорошего и отличного, много радостных эмоций и большого счастья!`;
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

  constructor(
    private readonly dialogSerivce: TuiDialogService,
    private readonly injector: Injector,
  ) {
    this.changesDictionary = new Map();
    this.fillChangesDictionary();
    this.initialMessage = MESSAGE;
    this.cryptedMessage = '';
    this.decryptedPercentage$.subscribe((percent) => {
      this.cryptedMessage = this.cryptMessage(this.initialMessage);
    })
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

  /** Перемешать словарь */
  // shakeArray(array: string[]): string[] {
  //   for(let i = 0; i < 10000; i++) {
  //     const randomIndex1 = Math.floor(Math.random() * array.length);
  //     const randomIndex2 = Math.floor(Math.random() * array.length);
  //     const tmp = array[randomIndex1];
  //     array[randomIndex1] = array[randomIndex2];
  //     array[randomIndex2] = tmp;
  //   }
  //   console.log(array.join(''))
  //   return array;
  // }


}
