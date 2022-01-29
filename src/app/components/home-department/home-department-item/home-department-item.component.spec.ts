import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDepartmentItemComponent } from './home-department-item.component';

describe('HomeDepartmentItemComponent', () => {
  let component: HomeDepartmentItemComponent;
  let fixture: ComponentFixture<HomeDepartmentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDepartmentItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDepartmentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
