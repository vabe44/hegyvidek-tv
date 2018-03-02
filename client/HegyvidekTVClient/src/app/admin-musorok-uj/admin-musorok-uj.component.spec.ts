import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMusorokUjComponent } from './admin-musorok-uj.component';

describe('AdminMusorokUjComponent', () => {
  let component: AdminMusorokUjComponent;
  let fixture: ComponentFixture<AdminMusorokUjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMusorokUjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMusorokUjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
