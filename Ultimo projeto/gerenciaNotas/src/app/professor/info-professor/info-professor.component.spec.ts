import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProfessorComponent } from './info-professor.component';

describe('InfoProfessorComponent', () => {
  let component: InfoProfessorComponent;
  let fixture: ComponentFixture<InfoProfessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoProfessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
