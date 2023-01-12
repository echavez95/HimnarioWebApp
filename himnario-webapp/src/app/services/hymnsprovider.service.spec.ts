import { TestBed } from '@angular/core/testing';

import { HymnsproviderService } from './hymnsprovider.service';

describe('HymnsproviderService', () => {
  let service: HymnsproviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HymnsproviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
