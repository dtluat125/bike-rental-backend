import { Test, TestingModule } from '@nestjs/testing';
import { DocksController } from './docks.controller';

describe('DocksController', () => {
  let controller: DocksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocksController],
    }).compile();

    controller = module.get<DocksController>(DocksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
