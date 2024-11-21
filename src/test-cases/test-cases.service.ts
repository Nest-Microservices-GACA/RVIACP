import { Injectable, Logger } from '@nestjs/common';
import { CreateTestCaseDto, UpdateTestCaseDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './entities';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TestCasesService {
  private readonly logger = new Logger('AplicationService');
  constructor(
    @InjectRepository(Application)
    private readonly appRepository: Repository<Application>
  ){}

  create(createTestCaseDto: CreateTestCaseDto) {
    return 'This action adds a new testCase';
  }

  findAll() {
    return `This action returns all testCases`;
  }

  async addAppTestCases(idu_proyecto: string, updateTestCaseDto: UpdateTestCaseDto) {
    try {
      const app = await this.appRepository.findOne({ where: { idu_proyecto: idu_proyecto } });
      if ( !app ) {
        this.logger.error('[test-cases.addAppTestCases.service]');
        throw new RpcException({
          status: 'Error',
          message: `App ${ idu_proyecto } no encontrado`,
        });
      }

      app.opc_arquitectura = {
        ...app.opc_arquitectura,
        [updateTestCaseDto.opcArquitectura]: true,
      };

      app.opc_estatus_caso = 2;
      await this.appRepository.save(app);

      // TODO: Implementar lógica para llamar a addons
      
      return {
        message: `Test case añadido a la aplicación ${idu_proyecto}`,
        application: app
      };

    } catch (error) {
      
      this.logger.error('[test-cases.addAppTestCases.service]',error);
      throw new RpcException({
        status: 'Error',
        message: `Hubo un error al añadir test case ${error}`,
      });
    }
  }

}
