import { TestBed } from '@angular/core/testing';

import { RecordResultService } from '../services/record-result.service';

describe('RecordResultService', () => {
  let service: RecordResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
