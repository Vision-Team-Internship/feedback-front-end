import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFloorItemComponent } from './home-floor-item.component';

describe('HomeFloorItemComponent', () => {
  let component: HomeFloorItemComponent;
  let fixture: ComponentFixture<HomeFloorItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeFloorItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFloorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
