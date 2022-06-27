import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptedMessageComponent } from './crypted-message.component';

describe('CryptedMessageComponent', () => {
  let component: CryptedMessageComponent;
  let fixture: ComponentFixture<CryptedMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptedMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptedMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
