import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeresesTalalatokComponent } from './kereses-talalatok.component';

describe('KeresesTalalatokComponent', () => {
  let component: KeresesTalalatokComponent;
  let fixture: ComponentFixture<KeresesTalalatokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeresesTalalatokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeresesTalalatokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
