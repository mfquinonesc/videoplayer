import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Playlist } from '../models/playlist';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  path: string = `${environment.API_PATH}/playlist`;

  private _playlists = new BehaviorSubject<Playlist[]>([]);

  constructor(private http: HttpClient) { }

  get playlists(): Observable<any> {
    return this._playlists.asObservable();
  }

  set playlists(value: Playlist[]) {
    this._playlists.next(value);
  }

  create(playlist: Playlist): Observable<any> {
    return this.http.post(this.path, playlist);
  }

  getAll(): Observable<any> {
    return this.http.get(this.path);
  }

  get(id: number): Observable<any> {
    return this.http.get(`${this.path}/${id}`);
  }

  update(id: number, playlist: Playlist): Observable<any> {
    return this.http.put(`${this.path}/${id}`, playlist);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.path}/${id}`);
  }

}
