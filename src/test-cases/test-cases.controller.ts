import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TestCasesService } from './test-cases.service';
import { UpdateTestCaseDto } from './dto';

@Controller()
export class TestCasesController {
  constructor(private readonly testCasesService: TestCasesService) {}

  @MessagePattern('testCases.findAll')
  findAll() {
    return this.testCasesService.findAll();
  }

  @MessagePattern('testCases.addAppTestCases')
  addAppTestCases(@Payload() updateCostoDto: UpdateTestCaseDto) {
    return this.testCasesService.addAppTestCases(updateCostoDto.idu_proyecto,updateCostoDto);
  }

}
