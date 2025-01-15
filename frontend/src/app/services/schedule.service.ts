import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Scheduler } from 'rxjs';
import { Schedule } from '../models/schedule';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  path: string = `${environment.API_PATH}/schedule`;

  private _schedules = new BehaviorSubject<Schedule[]>([]);

  constructor(private http: HttpClient) { }

  get schedules(): Observable<any> {
    return this._schedules.asObservable();
  }

  set schedules(value: Schedule[]) {
    this._schedules.next(value);
  }

  create(schedule: Schedule): Observable<any> { 
    return this.http.post(this.path, schedule);
  }

  getAll(): Observable<any> {
    return this.http.get(this.path);
  }

  get(id: number): Observable<any> {
    return this.http.get(`${this.path}/${id}`);
  }

  update(id: number, schedule: Schedule): Observable<any> {
    return this.http.put(`${this.path}/${id}`, schedule);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.path}/${id}`);
  }
}
