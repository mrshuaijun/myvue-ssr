import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
        this.appService = new AppService()
    }

    @Get('/getdata')
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('/getdata2')
    getHello2(): string {
        return "这是serverData2";
    }
}
