import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePartComponent } from './image-part.component';

describe('ImagePartComponent', () => {
  let component: ImagePartComponent;
  let fixture: ComponentFixture<ImagePartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagePartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
