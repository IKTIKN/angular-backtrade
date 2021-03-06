import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalBarComponent } from './interval-bar.component';

describe('IntervalBarComponent', () => {
  let component: IntervalBarComponent;
  let fixture: ComponentFixture<IntervalBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntervalBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervalBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
