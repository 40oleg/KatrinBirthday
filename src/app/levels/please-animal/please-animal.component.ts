import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import goodWords from './goodWords';
import badWords from './badWords';
import { debounceTime } from 'rxjs';
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

  constructor(
    private readonly scoreSerivce: ScoreService,
  ) {
    this.characterMood = ToneTypes.START_MOOD;
    this.compliment = new FormControl('', Validators.required);
    this.compliment.valueChanges
    .pipe(
      debounceTime(1000)
    )
    .subscribe((compliment: string) => {
      const setMood = this.checkTone(compliment);
      setMood();
    })
    this.levelReward = LEVEL_REWARD;
  }

  ngOnInit(): void {
  }

  checkTone(compliment: string): () => void {
    if (!compliment.length) return this.setStartCharacterMood.bind(this);
    let ifPositive = ToneTypes.UNDETERMINED;
    for (const goodWord of goodWords) {
      if (compliment.toLowerCase().split(/\s+/).includes(goodWord.toLowerCase())) {
        ifPositive = ToneTypes.POSITIVE;
        break;
      }
    }

    let ifNegative = ToneTypes.UNDETERMINED;
    for (const badWord of badWords) {
      if (compliment.toLowerCase().split(/\s+/).includes(badWord.toLowerCase())) {
        ifNegative = ToneTypes.NEGATIVE;
        break;
      }
    }

    console.log(ifPositive, ifNegative)
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
  }

}
