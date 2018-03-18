import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKapcsolatComponent } from './admin-kapcsolat.component';

describe('AdminKapcsolatComponent', () => {
  let component: AdminKapcsolatComponent;
  let fixture: ComponentFixture<AdminKapcsolatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminKapcsolatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminKapcsolatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
