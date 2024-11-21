import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { Repository } from 'typeorm';

import { Application } from './entities';
import { UpdateTestCaseDto } from './dto';

@Injectable()
export class TestCasesService {

  private readonly logger = new Logger('AplicationService');
  constructor(
    @InjectRepository(Application)
    private readonly appRepository: Repository<Application>
  ){}

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

  async findAllAppTestCases() {
    try {
      const apps = await this.appRepository.createQueryBuilder('application')
      .where("application.opc_arquitectura->>'3' = :value", { value: 'true' })
      .getMany();;
      
      return apps || [];
      
    } catch (error) {
      
      this.logger.error('[test-cases.findAllAppTestCases.service]',error);
      throw new RpcException({
        status: 'Error',
        message: `Hubo un error consultar app con test case: ${error}`,
      });
    }
  }

}
