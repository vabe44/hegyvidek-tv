import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminYoutubeAuthComponent } from './admin-youtube-auth.component';

describe('AdminYoutubeAuthComponent', () => {
  let component: AdminYoutubeAuthComponent;
  let fixture: ComponentFixture<AdminYoutubeAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminYoutubeAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminYoutubeAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
