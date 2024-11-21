import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestCasesService } from './test-cases.service';
import { TestCasesController } from './test-cases.controller';
import { Application } from './entities';

@Module({
  controllers: [TestCasesController],
  providers: [TestCasesService],
  imports: [
    TypeOrmModule.forFeature([ Application ])
  ]
})
export class TestCasesModule {}
