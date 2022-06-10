import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { PollStatusListDto, TodoListItemDto } from '@common/interfaces';
import { CardsService } from '../services/cards.service';
import { NotFoundInterceptor } from '../../core/interceptors';

@Controller('api/cards')
export class CardsController {
    constructor(private readonly cardsService: CardsService) {}

    @Get()
    async getAll(): Promise<TodoListItemDto[]> {
        return await this.cardsService.getAll();
    }

    @Get(':id')
    @UseInterceptors(NotFoundInterceptor)
    async getOne(@Param('id') id: string): Promise<TodoListItemDto> {
        return await this.cardsService.getOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createCard(@Body('description') description: string): Promise<TodoListItemDto[]> {
        return this.cardsService.createCard(description);
    }

    @Post('/poll-status')
    async getPollStatus(@Body('cardIds') cardIds: string[]): Promise<PollStatusListDto[]> {
        return this.cardsService.getPollStatus(cardIds);
    }

    @Put()
    @UseInterceptors(NotFoundInterceptor)
    async updateCard(@Body() card: TodoListItemDto): Promise<TodoListItemDto> {
        return this.cardsService.updateCard(card);
    }

    @Delete(':id')
    @UseInterceptors(NotFoundInterceptor)
    async deleteCard(@Param('id') id: string): Promise<TodoListItemDto[]> {
        return this.cardsService.deleteCard(id);
    }
}
