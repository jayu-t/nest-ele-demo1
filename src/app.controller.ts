import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Payload } from '@nestjs/microservices';
import { IpcOn } from './microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @MessagePattern('echo')
  // echo(@Payload() data: object) {
  //   return data;
  // }

  @IpcOn('hello')
  echo(@Payload() data: object) {
    console.log('echo');
    return data;
  }
}
