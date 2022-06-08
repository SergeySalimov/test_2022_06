import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { TodoListItemDto } from '@common/interfaces';

@Injectable()
export class NotFoundInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

      return next.handle().pipe(
          map((card: TodoListItemDto | undefined) => {
              if (!card) {
                  throw new HttpException('Element was not found', HttpStatus.NOT_FOUND);
              }

              return card;
          }),
      );
  }
}
