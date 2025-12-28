import { Test, TestingModule } from '@nestjs/testing';
import { ManuscriptsController } from './manuscripts.controller';

describe('ManuscriptsController', () => {
  let controller: ManuscriptsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManuscriptsController],
    }).compile();

    controller = module.get<ManuscriptsController>(ManuscriptsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
