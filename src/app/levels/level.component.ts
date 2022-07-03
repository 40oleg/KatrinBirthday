import { Component, OnInit } from '@angular/core';


enum LevelsEnum {
  EMPTY_LEVEL = 'empty_level',
  PLEASE_ANIMAL = 'please_animal',
  PUZZLE_IMAGE = 'puzzle_image',
}

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent implements OnInit {

  activeLevel: string;

  constructor() {
    this.activeLevel = LevelsEnum.EMPTY_LEVEL;
  }

  ngOnInit(): void {
  }

  loadFirstLevel() {
    alert(1)
    this.activeLevel = LevelsEnum.PLEASE_ANIMAL;
  }

  loadSecondLevel() {
    this.activeLevel = LevelsEnum.PUZZLE_IMAGE;
  }

  loadThirdLevel() {
    this.activeLevel = LevelsEnum.PLEASE_ANIMAL;
  }

  get LevelsEnum(): typeof LevelsEnum  {
    return LevelsEnum;
  }

}
