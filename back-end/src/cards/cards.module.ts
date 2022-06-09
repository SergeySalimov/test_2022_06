import { Module } from '@nestjs/common';
import { CardsService } from './services/cards.service';
import { CardsController } from './controllers/cards.controller';

@Module({
    providers: [CardsService],
    controllers: [CardsController],
})
export class CardsModule {}
