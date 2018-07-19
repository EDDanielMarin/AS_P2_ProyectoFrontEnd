import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteAccesosComponent } from './reporte-accesos.component';

describe('ReporteAccesosComponent', () => {
  let component: ReporteAccesosComponent;
  let fixture: ComponentFixture<ReporteAccesosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteAccesosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteAccesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
