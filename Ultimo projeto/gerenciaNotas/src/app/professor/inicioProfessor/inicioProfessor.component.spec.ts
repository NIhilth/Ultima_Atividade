import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioProfessorComponent } from './inicioProfessor.component';

describe('PerfilComponent', () => {
  let component: InicioProfessorComponent;
  let fixture: ComponentFixture<InicioProfessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioProfessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
