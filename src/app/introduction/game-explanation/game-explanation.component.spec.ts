import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameExplanationComponent } from './game-explanation.component';

describe('GameExplanationComponent', () => {
  let component: GameExplanationComponent;
  let fixture: ComponentFixture<GameExplanationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameExplanationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
