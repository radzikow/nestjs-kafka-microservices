import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('get_user')
  getUser(@Payload() payload: any, @Ctx() context: KafkaContext) {
    console.log('context 1: ', context);
    console.log('context 2: ', context.getTopic());
    console.log('context 3: ', context.getMessage());

    return this.appService.getUser(payload.value);
  }
}
