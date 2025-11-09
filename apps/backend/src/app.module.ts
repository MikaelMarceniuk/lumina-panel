import { Module } from '@nestjs/common';
import { AppController } from './http/resources/app/app.controller';
import { AppService } from './http/resources/app/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
