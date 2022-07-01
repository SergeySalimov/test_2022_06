import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { TodoListItemDto } from '@common/interfaces';
import mongoose from 'mongoose';

@Injectable()
export class CheckAndParseIdInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const { id } = context.switchToHttp().getRequest().params;

        if (!id?.match(/^[0-9a-fA-F]{24}$/)) {
            throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
        }

        return next.handle().pipe(
            map((todo: TodoListItemDto) => ({ ...todo, id: new mongoose.Types.ObjectId(todo.id) })),
        );
    }
}
