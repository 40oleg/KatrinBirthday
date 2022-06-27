import { Component, Inject, Injector } from '@angular/core';
import { TuiAlertService, TuiDialogService } from '@taiga-ui/core';
import { FirstWordComponent } from './introduction/first-word/first-word.component';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { FakeLoadCongratulationsComponent } from './introduction/fake-load-congratulations/fake-load-congratulations.component';
import { timer } from 'rxjs';
import { GameExplanationComponent } from './introduction/game-explanation/game-explanation.component';
import { ScoreService } from './services/score.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'KatrinBirthday';
  private readonly dialogFirstWord = this.dialogSerivce.open(
    new PolymorpheusComponent(FirstWordComponent, this.injector),
    {
      size: 's',
      closeable: false,
      dismissible: false,
    }
  );
  private readonly dialogFakeLoading = this.dialogSerivce.open(
    new PolymorpheusComponent(FakeLoadCongratulationsComponent, this.injector),
    {
      size: 's',
      closeable: false,
      dismissible: false,
    }
  );
  private readonly gameExplanationLoading = this.dialogSerivce.open(
    new PolymorpheusComponent(GameExplanationComponent, this.injector),
    {
      size: 'l',
      closeable: false,
      dismissible: false,
    }
  );
  constructor(
    private readonly dialogSerivce: TuiDialogService,
    private readonly injector: Injector,
    private readonly scoreService: ScoreService,
    private readonly alertService: TuiAlertService,
  ) {
    // this.dialogFirstWord.subscribe(() => {
    //     timer(500).subscribe(() => {
    //         this.dialogFakeLoading.subscribe(() => {
    //           timer(500).subscribe(() => {
    //             this.gameExplanationLoading.subscribe((value: number | void) => {
    //               if (typeof value === 'number') {
    //                 this.scoreService.increaseScore(value);
    //                 const subscription = this.alertService.open( new PolymorpheusComponent(GameExplanationComponent, this.injector),).subscribe();
    //                 timer(3000).subscribe(subscription.unsubscribe.bind(this));
    //               }
    //           })
    //         })
    //       })
    //     })
    // })
  }
}
