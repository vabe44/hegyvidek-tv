import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HirekScrollerComponent } from './hirek-scroller.component';

describe('HirekScrollerComponent', () => {
  let component: HirekScrollerComponent;
  let fixture: ComponentFixture<HirekScrollerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HirekScrollerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HirekScrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
