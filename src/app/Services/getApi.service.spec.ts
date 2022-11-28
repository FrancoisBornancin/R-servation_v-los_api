import { TestBed } from '@angular/core/testing';

import { getApi } from './getApi.service';

describe('NewService', () => {
  let service: getApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(getApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
