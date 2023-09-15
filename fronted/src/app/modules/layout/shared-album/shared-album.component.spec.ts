import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedAlbumComponent } from './shared-album.component';

describe('SharedAlbumComponent', () => {
  let component: SharedAlbumComponent;
  let fixture: ComponentFixture<SharedAlbumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SharedAlbumComponent]
    });
    fixture = TestBed.createComponent(SharedAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
