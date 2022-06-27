import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TuiButtonModule, TuiLoaderModule } from "@taiga-ui/core";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CryptedMessageComponent } from './crypted-message/crypted-message.component';
import { PleaseAnimalComponent } from './levels/please-animal/please-animal.component';
import { FirstWordComponent } from './introduction/first-word/first-word.component';
import { FakeLoadCongratulationsComponent } from './introduction/fake-load-congratulations/fake-load-congratulations.component';
import { GameExplanationComponent } from './introduction/game-explanation/game-explanation.component';
import { ScoreCounterComponent } from './controls/score-counter/score-counter.component';
import { LevelComponent } from "./levels/level.component";
import { TuiInputModule } from "@taiga-ui/kit";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    CryptedMessageComponent,
    PleaseAnimalComponent,
    FirstWordComponent,
    FakeLoadCongratulationsComponent,
    GameExplanationComponent,
    ScoreCounterComponent,
    LevelComponent,
  ],
  imports: [
    BrowserModule,
    TuiRootModule,
    BrowserAnimationsModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiButtonModule,
    TuiLoaderModule,
    TuiInputModule,
    FormsModule,
    ReactiveFormsModule,
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }