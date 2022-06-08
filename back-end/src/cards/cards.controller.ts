import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoListItemDto } from '@common/interfaces';
import { CardsService } from './cards.service';

@Controller('cards')
export class CardsController {
    constructor(private readonly cardsService: CardsService) {}

    @Get()
    getAll(): TodoListItemDto[] {
        return this.cardsService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): TodoListItemDto|void {
        return this.cardsService.getOne(id);
    }

    @Post()
    createCard(@Body() card: TodoListItemDto): string {
        return 'postCard: ' + card.description;
    }

    @Put(':id')
    patchCard(@Param('id') id: string): string {
        return 'patchCard by id: ' + id;
    }

    @Delete(':id')
    deleteCard(@Param('id') id: string): string {
        return 'deleteCard by id: das ' + id;
    }
}
