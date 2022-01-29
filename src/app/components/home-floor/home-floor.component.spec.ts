import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFloorComponent } from './home-floor.component';

describe('HomeFloorComponent', () => {
  let component: HomeFloorComponent;
  let fixture: ComponentFixture<HomeFloorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeFloorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
