import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMusorujsagComponent } from './admin-musorujsag.component';

describe('AdminMusorujsagComponent', () => {
  let component: AdminMusorujsagComponent;
  let fixture: ComponentFixture<AdminMusorujsagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMusorujsagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMusorujsagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
