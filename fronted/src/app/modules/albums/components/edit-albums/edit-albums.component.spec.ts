import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAlbumsComponent } from './edit-albums.component';

describe('EditAlbumsComponent', () => {
  let component: EditAlbumsComponent;
  let fixture: ComponentFixture<EditAlbumsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAlbumsComponent]
    });
    fixture = TestBed.createComponent(EditAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
