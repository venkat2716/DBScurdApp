import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http : HttpClient) { }

  postUser(data: any) {
    return this.http.post<any>("https://jsonplaceholder.typicode.com/users", data)
    .pipe(map((res: any) => {
      return res;
    }))
  }

  getUser(){
    return this.http.get<any>('https://jsonplaceholder.typicode.com/users')
    .pipe(map((res: any) => {
      return res;
    }))
  }

  updateUser(data: any, id: number) {
    return this.http.put<any>('https://jsonplaceholder.typicode.com/users/'+id, data)
    .pipe(map((res: any) => {
      return res;
    }))
  }

  deleteUser(id: any) {
    return this.http.delete<any>('https://jsonplaceholder.typicode.com/users/'+id)
    .pipe(map((res: any) => {
      return res;
    }))
  }
}
