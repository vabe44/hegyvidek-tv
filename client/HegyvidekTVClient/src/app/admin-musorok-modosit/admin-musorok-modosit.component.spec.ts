import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMusorokModositComponent } from './admin-musorok-modosit.component';

describe('AdminMusorokModositComponent', () => {
  let component: AdminMusorokModositComponent;
  let fixture: ComponentFixture<AdminMusorokModositComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMusorokModositComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMusorokModositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
