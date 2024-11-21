import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TestCasesService } from './test-cases.service';
import { CreateTestCaseDto } from './dto/create-test-case.dto';
import { UpdateTestCaseDto } from './dto/update-test-case.dto';

@Controller()
export class TestCasesController {
  constructor(private readonly testCasesService: TestCasesService) {}

  @MessagePattern('createTestCase')
  create(@Payload() createTestCaseDto: CreateTestCaseDto) {
    return this.testCasesService.create(createTestCaseDto);
  }

  @MessagePattern('findAllTestCases')
  findAll() {
    return this.testCasesService.findAll();
  }

  @MessagePattern('findOneTestCase')
  findOne(@Payload() id: number) {
    return this.testCasesService.findOne(id);
  }

  @MessagePattern('updateTestCase')
  update(@Payload() updateTestCaseDto: UpdateTestCaseDto) {
    return this.testCasesService.update(updateTestCaseDto.id, updateTestCaseDto);
  }

  @MessagePattern('removeTestCase')
  remove(@Payload() id: number) {
    return this.testCasesService.remove(id);
  }
}
