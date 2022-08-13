import { TestBed } from '@angular/core/testing';
import { FormBuilderService } from './form-builder.service';

describe('FormBuilderService', () => {
  let service: FormBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('key should be a number', () => {
    const generateQniqId = service.generateUniqId();
    const isNan = isNaN(generateQniqId);
    expect(isNan).toBeFalsy();
  });

});
