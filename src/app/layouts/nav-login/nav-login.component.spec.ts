import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavLoginComponent } from './nav-login.component';

describe('NavLoginComponent', () => {
  let component: NavLoginComponent;
  let fixture: ComponentFixture<NavLoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NavLoginComponent],
      imports: [
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
