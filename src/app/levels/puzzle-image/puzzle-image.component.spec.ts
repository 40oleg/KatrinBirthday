import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleImageComponent } from './puzzle-image.component';

describe('PuzzleImageComponent', () => {
  let component: PuzzleImageComponent;
  let fixture: ComponentFixture<PuzzleImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuzzleImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
