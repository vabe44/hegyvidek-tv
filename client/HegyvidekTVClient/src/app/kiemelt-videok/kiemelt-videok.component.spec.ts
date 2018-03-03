import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiemeltVideokComponent } from './kiemelt-videok.component';

describe('KiemeltVideokComponent', () => {
  let component: KiemeltVideokComponent;
  let fixture: ComponentFixture<KiemeltVideokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiemeltVideokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiemeltVideokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
