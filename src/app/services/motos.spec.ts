import { TestBed } from '@angular/core/testing';

import { Motos } from './motos';

describe('Motos', () => {
  let service: Motos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Motos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
