import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import goodWords from './goodWords';
import badWords from './badWords';
import { debounceTime, timer } from 'rxjs';
import { ScoreService } from '../../../../src/app/services/score.service';

const LEVEL_REWARD = 25;

enum ToneTypes {
  START_MOOD = 'START',
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  UNDETERMINED = 'undetermined',
}

@Component({
  selector: 'app-please-animal',
  templateUrl: './please-animal.component.html',
  styleUrls: ['./please-animal.component.scss']
})
export class PleaseAnimalComponent implements OnInit {

  characterMood: ToneTypes;

  compliment: FormControl;

  levelReward: number;

  @Input('nextLevel')
  nextLevel!: Function;

  levelFinished: boolean;

  constructor(
    private readonly scoreSerivce: ScoreService,
  ) {
    this.characterMood = ToneTypes.START_MOOD;
    this.compliment = new FormControl('', Validators.required);
    this.compliment.valueChanges
    .pipe(
      debounceTime(500)
    )
    .subscribe((compliment: string) => {
      const setMood = this.checkTone(compliment);
      setMood();
    })
    this.levelReward = LEVEL_REWARD;

    this.levelFinished = false;
    
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  checkTone(compliment: string): () => void {
    if (!compliment.length) return this.setStartCharacterMood.bind(this);
    let ifPositive = ToneTypes.UNDETERMINED;
    for (const goodWord of goodWords) {
      if (compliment.toLowerCase().split(/\s+/).map(el => this.getStem(el)).includes(this.getStem(goodWord.toLowerCase()))) {
        ifPositive = ToneTypes.POSITIVE;
        break;
      }
    }

    let ifNegative = ToneTypes.UNDETERMINED;
    for (const badWord of badWords) {
      if (compliment.toLowerCase().split(/\s+/).map(el => this.getStem(el)).includes(this.getStem(badWord.toLowerCase()))) {
        ifNegative = ToneTypes.NEGATIVE;
        break;
      }
    }
    if (ifPositive === ToneTypes.POSITIVE && ifNegative === ToneTypes.NEGATIVE) return this.setUndeterminedCharacterMood.bind(this); 
    if (ifPositive === ToneTypes.POSITIVE) return this.setPositiveCharacterMood.bind(this);
    if (ifNegative === ToneTypes.NEGATIVE) return this.setNegativeCharacterMood.bind(this);
    return this.setUndeterminedCharacterMood.bind(this);
  }

  setNegativeCharacterMood() {
    this.characterMood = ToneTypes.NEGATIVE;
  }

  setPositiveCharacterMood() {
    this.characterMood = ToneTypes.POSITIVE;
  }

  setUndeterminedCharacterMood() {
    this.characterMood = ToneTypes.UNDETERMINED;
  }

  setStartCharacterMood() {
    this.characterMood = ToneTypes.START_MOOD;
  }

  get ToneTypes(): typeof ToneTypes {
    return ToneTypes;
  }

  getReward() {
    this.scoreSerivce.increaseScore(this.levelReward);
    this.levelFinished = true;
    timer(1500).subscribe(() => {
      this.nextLevel();
    })
  }

  getStem(word: string) {  
    word = word.replace(/[^а-яА-Я ]/gm, '');  
    var DICT = {
        RVRE: /^(.*?[аеиоуыэюя])(.*)$/i,
        PERFECTIVEGROUND_1: /([ая])(в|вши|вшись)$/gi,
        PERFECTIVEGROUND_2: /(ив|ивши|ившись|ыв|ывши|ывшись)$/i,
        REFLEXIVE: /(с[яь])$/i,
        ADJECTIVE: /(ее|ие|ые|ое|ими|ыми|ей|ий|ый|ой|ем|им|ым|ом|его|ого|ему|ому|их|ых|ую|юю|ая|яя|ою|ею)$/i,
        PARTICIPLE_1: /([ая])(ем|нн|вш|ющ|щ)$/gi,
        PARTICIPLE_2: /(ивш|ывш|ующ)$/i,
        VERB_1: /([ая])(ла|на|ете|йте|ли|й|л|ем|н|ло|но|ет|ют|ны|ть|ешь|нно)$/gi,
        VERB_2: /(ила|ыла|ена|ейте|уйте|ите|или|ыли|ей|уй|ил|ыл|им|ым|ен|ило|ыло|ено|ят|ует|уют|ит|ыт|ены|ить|ыть|ишь|ую|ю)$/i,
        NOUN: /(а|ев|ов|ие|ье|е|иями|ями|ами|еи|ии|и|ией|ей|ой|ий|й|иям|ям|ием|ем|ам|ом|о|у|ах|иях|ях|ы|ь|ию|ью|ю|ия|ья|я)$/i,
        DERIVATIONAL: /.*[^аеиоуыэюя]+[аеиоуыэюя].*ость?$/i,
        DER: /ость?$/i,
        SUPERLATIVE: /(ейше|ейш)$/i,
        I: /и$/i,
        P: /ь$/i,
        NN: /нн$/i
    };
      word = word.replace(/ё/gi, 'e');
      var wParts = word.match(DICT.RVRE);
      if (!wParts) {
          return word;
      }
      var start = wParts[1];
      var rv = wParts[2];
      var temp = rv.replace(DICT.PERFECTIVEGROUND_2, '');
      if (temp == rv) {
          temp = rv.replace(DICT.PERFECTIVEGROUND_1, '$1');
      }
      if (temp == rv) {
          rv = rv.replace(DICT.REFLEXIVE, '');
          temp = rv.replace(DICT.ADJECTIVE, '');
          if (temp != rv) {
              rv = temp;
              temp = rv.replace(DICT.PARTICIPLE_2, '');
              if (temp == rv) {
                  rv = rv.replace(DICT.PARTICIPLE_1, '$1');
              }
          } else {
              temp = rv.replace(DICT.VERB_2, '');
              if (temp == rv) {
                  temp = rv.replace(DICT.VERB_1, '$1');
              }
              if (temp == rv) {
                  rv = rv.replace(DICT.NOUN, '');
              } else {
                  rv = temp;
              }
          }
      } else {
          rv = temp;
      }
      rv = rv.replace(DICT.I, '');
      if (rv.match(DICT.DERIVATIONAL)) {
          rv = rv.replace(DICT.DER, '');
      }
      temp = rv.replace(DICT.P, '');
      if (temp == rv) {
          rv = rv.replace(DICT.SUPERLATIVE, '');
          rv = rv.replace(DICT.NN, 'н');
      } else {
          rv = temp;
      }
      return start + rv;
  }
}
