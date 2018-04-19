import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBannerekComponent } from './admin-bannerek.component';

describe('AdminBannerekComponent', () => {
  let component: AdminBannerekComponent;
  let fixture: ComponentFixture<AdminBannerekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBannerekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBannerekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
