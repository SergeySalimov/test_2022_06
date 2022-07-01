import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { IFilter, ISort, PollStatusListDto, StatusEnumDto, TodoListItemDto } from '@common/interfaces';
import { CardsService } from '../services/cards.service';
import { CheckAndParseIdInterceptor, NotFoundInterceptor } from '../../core/interceptors';
import mongoose from 'mongoose';

@Controller('api/cards')
export class CardsController {
    constructor(private readonly cardsService: CardsService) {
    }

    @Get()
    async getAll(): Promise<TodoListItemDto[]> {
        return await this.cardsService.getAll();
    }

    @Get('/status-enum')
    async getStatusEnum(): Promise<StatusEnumDto[]> {
        return this.cardsService.getStatusEnum();
    }

    @Get(':id')
    @UseInterceptors(CheckAndParseIdInterceptor, NotFoundInterceptor)
    async getOne(@Param('id') id: mongoose.Types.ObjectId): Promise<TodoListItemDto> {
        return await this.cardsService.getOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createCard(@Body('description') description: string): Promise<TodoListItemDto> {
        return this.cardsService.createCard(description);
    }

    @Post('/poll-status')
    async getPollStatus(@Body('cardIds') cardIds: string[]): Promise<PollStatusListDto[]> {
        return this.cardsService.getPollStatus(cardIds);
    }

    @Post('/get-all')
    async getFiltered(
        @Body('filters') filters: IFilter,
        @Body('sorting') sort: ISort,
    ): Promise<TodoListItemDto[]> {
        return this.cardsService.getFiltered(filters, sort);
    }

    @Put()
    @UseInterceptors(NotFoundInterceptor)
    async updateCard(@Body() card: TodoListItemDto): Promise<TodoListItemDto> {
        return this.cardsService.updateCard(card);
    }

    @Delete(':id')
    @UseInterceptors(CheckAndParseIdInterceptor, NotFoundInterceptor)
    async deleteCard(@Param('id') id: mongoose.Types.ObjectId): Promise<TodoListItemDto> {
        return this.cardsService.deleteCard(id);
    }
}
