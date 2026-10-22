import { Controller, Get, Inject, Param } from '@nestjs/common';
import { DemoService } from './demo.service';

@Controller('demo')
export class DemoController {
  constructor(@Inject(DemoService) private readonly demo: DemoService) {}
  @Get('profiles') profiles() {
    return { mode: 'DEMO', profiles: this.demo.profiles() };
  }
  @Get('profiles/:id/snapshot') snapshot(@Param('id') id: string) {
    return this.demo.snapshot(id);
  }
}
