import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { RenderController } from '../controllers/render.controller';
import { AppService } from '../services/app.service';

@Module({
    imports: [],
    controllers: [AppController, RenderController],
    providers: [AppService],
})
export class AppModule { }
