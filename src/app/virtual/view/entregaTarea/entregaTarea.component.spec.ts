import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaTareaComponent } from './entregaTarea.component';

describe('EntregaTareaComponent', () => {
  let component: EntregaTareaComponent;
  let fixture: ComponentFixture<EntregaTareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregaTareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregaTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
