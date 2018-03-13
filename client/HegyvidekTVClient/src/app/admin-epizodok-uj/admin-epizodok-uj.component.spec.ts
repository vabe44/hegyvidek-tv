import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEpizodokUjComponent } from './admin-epizodok-uj.component';

describe('AdminEpizodokUjComponent', () => {
  let component: AdminEpizodokUjComponent;
  let fixture: ComponentFixture<AdminEpizodokUjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEpizodokUjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEpizodokUjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
