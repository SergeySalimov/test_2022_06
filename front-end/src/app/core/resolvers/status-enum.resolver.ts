import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { StatusEnumDto } from '@common/interfaces';
import { ToDoService } from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class StatusEnumResolver implements Resolve<StatusEnumDto[]> {
  constructor(private readonly todoService: ToDoService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<StatusEnumDto[]> {
    return this.todoService.statusEnum$;
  }
}
