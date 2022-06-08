import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { TodoListItemDto } from '@common/interfaces';
import { CardsService } from './cards.service';
import { NotFoundInterceptor } from '../core/interceptors/not-found.interceptor';

@Controller('api/cards')
export class CardsController {
    constructor(private readonly cardsService: CardsService) {}

    @Get()
    getAll(): TodoListItemDto[] {
        return this.cardsService.getAll();
    }

    @Get(':id')
    @UseInterceptors(NotFoundInterceptor)
    getOne(@Param('id') id: string): TodoListItemDto|void {
        return this.cardsService.getOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createCard(@Body() { description }): TodoListItemDto[] {
        return this.cardsService.createCard(description);
    }

    @Put()
    @UseInterceptors(NotFoundInterceptor)
    updateCard(@Body() card: TodoListItemDto): TodoListItemDto {
        return this.cardsService.updateCard(card);
    }

    @Delete(':id')
    @UseInterceptors(NotFoundInterceptor)
    deleteCard(@Param('id') id: string): TodoListItemDto[] {
        return this.cardsService.deleteCard(id);
    }
}
