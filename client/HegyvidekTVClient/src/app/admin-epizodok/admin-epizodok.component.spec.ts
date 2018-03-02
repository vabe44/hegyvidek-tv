import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEpizodokComponent } from './admin-epizodok.component';

describe('AdminEpizodokComponent', () => {
  let component: AdminEpizodokComponent;
  let fixture: ComponentFixture<AdminEpizodokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEpizodokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEpizodokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
