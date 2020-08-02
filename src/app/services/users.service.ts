import {Injectable} from '@angular/core';

import {Socket} from 'ngx-socket-io';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {User} from "../models/User";


/**
 * @author abdel-maliki
 * Date : 17/01/2020
 */


@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private socket: Socket, protected httpClient: HttpClient) {
  }

  public findAll() {
    return this.httpClient.get<any>(encodeURI('http://localhost:5000/users'), this.baseOption)
      .pipe(catchError(this.handleError));
  }

  public delete(id) {
    return this.httpClient.delete<any>(encodeURI('http://localhost:5000/users/user/' + id), this.baseOption)
      .pipe(catchError(this.handleError));
  }


  public save(user: User) {
    return this.httpClient.post<any>(encodeURI('http://localhost:5000/users/user'), JSON.stringify(user), this.baseOption)
      .pipe(catchError(this.handleError));
  }

  public update(id: number, user: User) {
    return this.httpClient.put<any>(encodeURI('http://localhost:5000/users/user/' + id), JSON.stringify(user), this.baseOption)
      .pipe(catchError(this.handleError));
  }


  protected handleError(error) {
    return throwError(error);
  }

  get baseOption() {
    const _headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    return {headers: _headers};
  }

  subscribAll() {
    return this.socket.fromEvent('change');
  }

  subscribeUser(id) {
    return this.socket.fromEvent('change' + id);
  }
}
