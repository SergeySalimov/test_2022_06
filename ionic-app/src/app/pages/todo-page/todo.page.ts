import { Component, OnInit } from '@angular/core';
import { TodoListItemDto } from '@common/interfaces';
import { CLEAR_FILTER, DATE_TIME_FORMAT, DEFAULT_SORT } from '@core/constants';
import { TodoService } from '@core/services';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { AppRoutes } from '@core/helpers';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { from } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {
  todos: TodoListItemDto[];
  dateFormat = DATE_TIME_FORMAT;
  addTodoForm: FormGroup = new FormGroup({
    addTodo: new FormControl(null, Validators.required),
  });

  get addTodoControl(): FormControl {
    return this.addTodoForm.get('addTodo') as FormControl;
  }

  constructor(
    public toastController: ToastController,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(() => {
      this.refreshTodos();
    });
  }

  getCardRoute(id: string): string {
    return `${AppRoutes.CARD('full')}/${id}`;
  }

  refreshTodos(): void {
    this.todoService.getAllTodos(CLEAR_FILTER, DEFAULT_SORT).pipe(take(1)).subscribe((data: TodoListItemDto[]) => {
      this.todos = [...data];
    });
  }

  addNewTodo(): void {
    if (this.addTodoForm.invalid) {
      return;
    }

    this.todoService.addTodoItem(this.addTodoControl.value).pipe(
      switchMap(() => from(this.toastController.create({
        message: 'Todo was added!',
        color: 'success',
        duration: 2000,
      })).pipe(
        tap((toast) => toast.present())
      )),
    ).subscribe(() => {
      this.addTodoForm.reset();
      this.refreshTodos();
    })
  }
}
