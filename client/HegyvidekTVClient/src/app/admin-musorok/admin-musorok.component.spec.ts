import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMusorokComponent } from './admin-musorok.component';

describe('AdminMusorokComponent', () => {
  let component: AdminMusorokComponent;
  let fixture: ComponentFixture<AdminMusorokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMusorokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMusorokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
