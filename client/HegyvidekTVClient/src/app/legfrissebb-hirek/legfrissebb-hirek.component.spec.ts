import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegfrissebbHirekComponent } from './legfrissebb-hirek.component';

describe('LegfrissebbHirekComponent', () => {
  let component: LegfrissebbHirekComponent;
  let fixture: ComponentFixture<LegfrissebbHirekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegfrissebbHirekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegfrissebbHirekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
