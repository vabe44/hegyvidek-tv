import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMediaajanlatComponent } from './admin-mediaajanlat.component';

describe('AdminMediaajanlatComponent', () => {
  let component: AdminMediaajanlatComponent;
  let fixture: ComponentFixture<AdminMediaajanlatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMediaajanlatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMediaajanlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
