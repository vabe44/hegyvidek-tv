import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHirekComponent } from './admin-hirek.component';

describe('AdminHirekComponent', () => {
  let component: AdminHirekComponent;
  let fixture: ComponentFixture<AdminHirekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHirekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHirekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
