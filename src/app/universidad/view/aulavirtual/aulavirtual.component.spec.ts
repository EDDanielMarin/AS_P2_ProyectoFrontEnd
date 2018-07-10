import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AulavirtualComponent } from './aulavirtual.component';

describe('AulavirtualComponent', () => {
  let component: AulavirtualComponent;
  let fixture: ComponentFixture<AulavirtualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AulavirtualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AulavirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
