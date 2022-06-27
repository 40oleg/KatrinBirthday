import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PleaseAnimalComponent } from './please-animal.component';

describe('PleaseAnimalComponent', () => {
  let component: PleaseAnimalComponent;
  let fixture: ComponentFixture<PleaseAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PleaseAnimalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PleaseAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
