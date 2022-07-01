import { Module } from '@nestjs/common';
import { CardsService } from './services/cards.service';
import { CardsController } from './controllers/cards.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoListItem, TodoListItemSchema } from './schemas/todo-list-item.schema';

@Module({
    providers: [CardsService],
    controllers: [CardsController],
    imports: [
        MongooseModule.forFeature([
            { name: TodoListItem.name, schema: TodoListItemSchema },
        ]),
    ],
})
export class CardsModule {}
