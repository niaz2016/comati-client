import { TestBed } from '@angular/core/testing';

import { GetComatiesService } from './get-comaties.service';

describe('GetComatiesService', () => {
  let service: GetComatiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetComatiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
