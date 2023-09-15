import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionGrantedComponent } from './permission-granted.component';

describe('PermissionGrantedComponent', () => {
  let component: PermissionGrantedComponent;
  let fixture: ComponentFixture<PermissionGrantedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PermissionGrantedComponent]
    });
    fixture = TestBed.createComponent(PermissionGrantedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
