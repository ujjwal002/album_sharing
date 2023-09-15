import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareEmailsComponent } from './share-emails.component';

describe('ShareEmailsComponent', () => {
  let component: ShareEmailsComponent;
  let fixture: ComponentFixture<ShareEmailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShareEmailsComponent]
    });
    fixture = TestBed.createComponent(ShareEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
