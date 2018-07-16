import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtemaComponent } from './subtema.component';

describe('SubtemaComponent', () => {
  let component: SubtemaComponent;
  let fixture: ComponentFixture<SubtemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
