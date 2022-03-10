import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioAlunoComponent } from './inicioAluno.component';

describe('InicioAlunoComponent', () => {
  let component: InicioAlunoComponent;
  let fixture: ComponentFixture<InicioAlunoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioAlunoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
