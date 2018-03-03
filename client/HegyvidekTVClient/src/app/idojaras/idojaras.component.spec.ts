import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdojarasComponent } from './idojaras.component';

describe('IdojarasComponent', () => {
  let component: IdojarasComponent;
  let fixture: ComponentFixture<IdojarasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdojarasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdojarasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
