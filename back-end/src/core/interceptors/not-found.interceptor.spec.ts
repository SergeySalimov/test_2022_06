import { NotFoundInterceptor } from './not-found.interceptor';
import { TodoListItemDto } from '@common/interfaces';
import { ExecutionContext, HttpStatus } from '@nestjs/common';
import { of } from 'rxjs';

const mockDate = new Date('2222/2/22');
const todoListItem1: TodoListItemDto = { id: 'mockId1', createdAt: mockDate, description: 'mockDescription1' };

describe('NotFoundInterceptor', () => {
    const interceptor: NotFoundInterceptor = new NotFoundInterceptor();

    it('should be defined', () => {
        expect(interceptor).toBeDefined();
    });

    describe('intercept', () => {
        it('should pass truthy value as it is', (done) => {
            const observable$ = interceptor.intercept({} as ExecutionContext, { handle: () => of(todoListItem1) });

            observable$.subscribe(result => {
                expect(result).toEqual(todoListItem1);
                done();
            });
        });

        it('should throw http exception on falsy value', (done) => {
            const observable$ = interceptor.intercept({} as ExecutionContext, { handle: () => of(null) });

            observable$.subscribe({
                error: err => {
                    expect(err.response).toEqual('Element was not found');
                    expect(err.status).toEqual(HttpStatus.NOT_FOUND);
                    done();
                },
            });
        });
    });
});
