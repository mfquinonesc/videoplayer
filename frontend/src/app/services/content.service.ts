import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Content } from '../models/content';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  path: string = `${environment.API_PATH}/content`;

  constructor(private http: HttpClient) { }

  create(content: Content): Observable<any> {
    return this.http.post(this.path, content.formData);
  }

  getAll(): Observable<any> {
    return this.http.get(this.path);
  }

  getUrl(fileName: string) {
    return `${environment.API_PATH}/media/${fileName}`;
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.path}/${id}`);
  }

  get(id: number): Observable<any> {
    return this.http.get(`${this.path}/${id}`);
  }

  update(id: number, content: Content): Observable<any> {
    return this.http.put(`${this.path}/${id}`, content.formData);
  }

  getList(id: number): Observable<any> {
    return this.http.get(`${this.path}/list`, {
      params: { id: id }
    });
  }

  sortList(arr: string): Observable<any> {
    return this.http.get(`${this.path}/sort`, {
      params: { arr: arr }
    });
  }
}