import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForoAlumnoComponent } from './ForoAlumno.component';

describe('ForoAlumnoAlumnoComponent', () => {
  let component: ForoAlumnoComponent;
  let fixture: ComponentFixture<ForoAlumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForoAlumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForoAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
