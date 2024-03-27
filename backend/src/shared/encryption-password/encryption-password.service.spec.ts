import { Test, TestingModule } from '@nestjs/testing';
import { EncryptionPasswordService } from './encryption-password.service';

describe('EncryptionPasswordService', () => {
  let service: EncryptionPasswordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncryptionPasswordService],
    }).compile();

    service = module.get<EncryptionPasswordService>(EncryptionPasswordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
