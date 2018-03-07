import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeresesComponent } from './kereses.component';

describe('KeresesComponent', () => {
  let component: KeresesComponent;
  let fixture: ComponentFixture<KeresesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeresesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeresesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
