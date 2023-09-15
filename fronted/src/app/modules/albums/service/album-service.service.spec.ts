import { TestBed } from '@angular/core/testing';

import { AlbumServiceService } from './album-service.service';

describe('AlbumServiceService', () => {
  let service: AlbumServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
