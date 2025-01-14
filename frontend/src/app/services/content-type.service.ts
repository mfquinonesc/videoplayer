import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContentType } from '../models/content-type';

@Injectable({
  providedIn: 'root'
})
export class ContentTypeService {

  path: string = `${environment.API_PATH}/contenttype`;

  private _types = new BehaviorSubject<ContentType[]>([]);

  constructor(private http: HttpClient) { } 

  get types():Observable<any>{
    return this._types.asObservable();
  }

  set types(value:ContentType[]){
    this._types.next(value);
  }

  getAll(): Observable<any> {    
    return this.http.get(this.path);
  }

}
