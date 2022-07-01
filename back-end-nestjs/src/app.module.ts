import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/todo-cards'),
        ScheduleModule.forRoot(),
        CardsModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
