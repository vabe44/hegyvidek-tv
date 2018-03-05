import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegebbiVideokComponent } from './regebbi-videok.component';

describe('RegebbiVideokComponent', () => {
  let component: RegebbiVideokComponent;
  let fixture: ComponentFixture<RegebbiVideokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegebbiVideokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegebbiVideokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
