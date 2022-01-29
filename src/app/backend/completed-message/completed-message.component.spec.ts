import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedMessageComponent } from './completed-message.component';

describe('CompletedMessageComponent', () => {
  let component: CompletedMessageComponent;
  let fixture: ComponentFixture<CompletedMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
