import { TestBed } from '@angular/core/testing';

import { DetailCommandeService } from './detail-commande.service';

describe('DetailCommandeService', () => {
  let service: DetailCommandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailCommandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
