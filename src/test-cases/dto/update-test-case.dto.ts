import { PartialType } from '@nestjs/mapped-types';
import { CreateTestCaseDto } from './create-test-case.dto';
import { IsString } from 'class-validator';

export class UpdateTestCaseDto extends PartialType(CreateTestCaseDto) {
  @IsString()
  idu_proyecto: string;
}
