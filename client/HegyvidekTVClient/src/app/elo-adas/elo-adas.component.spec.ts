import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EloAdasComponent } from './elo-adas.component';

describe('EloAdasComponent', () => {
  let component: EloAdasComponent;
  let fixture: ComponentFixture<EloAdasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EloAdasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EloAdasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
