import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NrcComponent } from './nrc.component';

describe('NrcComponent', () => {
  let component: NrcComponent;
  let fixture: ComponentFixture<NrcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NrcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NrcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
