import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAlbumsComponent } from './show-albums.component';

describe('ShowAlbumsComponent', () => {
  let component: ShowAlbumsComponent;
  let fixture: ComponentFixture<ShowAlbumsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowAlbumsComponent]
    });
    fixture = TestBed.createComponent(ShowAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
