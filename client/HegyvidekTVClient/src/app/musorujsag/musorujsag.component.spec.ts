import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusorujsagComponent } from './musorujsag.component';

describe('MusorujsagComponent', () => {
  let component: MusorujsagComponent;
  let fixture: ComponentFixture<MusorujsagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusorujsagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusorujsagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
