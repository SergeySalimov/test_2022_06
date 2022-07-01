import { Component, OnInit } from '@angular/core';
import { TodoService } from '@core/services';
import { TodoListItemDto } from '@common/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { DATE_TIME_FORMAT } from '@core/constants';
import { AlertController, ToastController } from '@ionic/angular';
import { AppRoutes } from '@core/helpers';
import { switchMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-card-page',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {
  cardData: TodoListItemDto|null;
  dateFormat = DATE_TIME_FORMAT;
  heartColor: 'dark'|'danger' = 'dark';
  id: string;

  constructor(
    public toastController: ToastController,
    public alertController: AlertController,
    private readonly todoService: TodoService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['cardId'];

    this.todoService.getItemById(this.id).subscribe((data: TodoListItemDto|null) => {
      this.cardData = data;
    })
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Delete item!',
      message: 'Do you really want to delete this item?',
      backdropDismiss: true,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Okay', handler: () => this.onDeleteTodo() },
      ],
    });

    await alert.present();
  }

  onDeleteTodo(): void {
    this.todoService.removeTodoItem(this.id).pipe(
      switchMap(() => from(this.toastController.create({
        message: 'Todo was deleted!',
        color: 'dark',
        duration: 4000,
      })).pipe(
        tap((toast) => toast.present()),
      )),
    ).subscribe(() => {
      this.router.navigate([AppRoutes.TODO()]);
    });
  }
}
