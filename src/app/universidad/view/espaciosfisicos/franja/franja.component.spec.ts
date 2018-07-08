import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranjaComponent } from './franja.component';

describe('FranjaComponent', () => {
  let component: FranjaComponent;
  let fixture: ComponentFixture<FranjaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranjaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
