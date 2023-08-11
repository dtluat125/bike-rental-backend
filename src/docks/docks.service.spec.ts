import { Test, TestingModule } from '@nestjs/testing';
import { DocksService } from './docks.service';

describe('DocksService', () => {
  let service: DocksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocksService],
    }).compile();

    service = module.get<DocksService>(DocksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
