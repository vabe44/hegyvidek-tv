import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEpizodokModositComponent } from './admin-epizodok-modosit.component';

describe('AdminEpizodokModositComponent', () => {
  let component: AdminEpizodokModositComponent;
  let fixture: ComponentFixture<AdminEpizodokModositComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEpizodokModositComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEpizodokModositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
