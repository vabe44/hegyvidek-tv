import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusorainkComponent } from './musoraink.component';

describe('MusorainkComponent', () => {
  let component: MusorainkComponent;
  let fixture: ComponentFixture<MusorainkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusorainkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusorainkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
