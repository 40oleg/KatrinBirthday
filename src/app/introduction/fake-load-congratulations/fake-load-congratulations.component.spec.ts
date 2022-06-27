import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeLoadCongratulationsComponent } from './fake-load-congratulations.component';

describe('FakeLoadCongratulationsComponent', () => {
  let component: FakeLoadCongratulationsComponent;
  let fixture: ComponentFixture<FakeLoadCongratulationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FakeLoadCongratulationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeLoadCongratulationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
