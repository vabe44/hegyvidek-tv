import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaajanlatComponent } from './mediaajanlat.component';

describe('MediaajanlatComponent', () => {
  let component: MediaajanlatComponent;
  let fixture: ComponentFixture<MediaajanlatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaajanlatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaajanlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
