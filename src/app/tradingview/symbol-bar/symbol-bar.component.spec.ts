import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolBarComponent } from './symbol-bar.component';

describe('SymbolBarComponent', () => {
  let component: SymbolBarComponent;
  let fixture: ComponentFixture<SymbolBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SymbolBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
