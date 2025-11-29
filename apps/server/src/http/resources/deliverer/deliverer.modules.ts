import { Module } from '@nestjs/common';
import { DelivererController } from './deliverer.controller';
import { DelivererService } from './deliverer.service';

@Module({
  controllers: [DelivererController],
  providers: [DelivererService],
})
export class DelivererModule {}
