import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportePreguntaComponent } from './reporte-pregunta.component';

describe('ReportePreguntaComponent', () => {
  let component: ReportePreguntaComponent;
  let fixture: ComponentFixture<ReportePreguntaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportePreguntaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportePreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
