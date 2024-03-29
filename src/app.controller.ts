import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ElectronIpcHandle,
  ElectronIpcOn,
} from './ipc-microservices/ipc.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ElectronIpcOn('hello', { async: true })
  hello(data: { name: string; age: number }) {
    console.log('hello : ');
    console.log(data);
    return data;
  }

  @ElectronIpcHandle('test')
  test(data: string) {
    console.log('test : ');
    console.log(data);
    return data;
  }

  // @ElectronIpcOn('test')
  // test1(data: string) {
  //   console.log('test : ');
  //   console.log(data);
  //   return data;
  // }
}
