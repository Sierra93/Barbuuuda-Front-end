// TODO: Удалить если не будет нужно.
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';

// export interface Posts {
//   userId: number;
//   id: number;
//   title: string;
//   body: string;
// }

// // Класс нужен для 
// @Injectable()
// export class ApiService {

//   private postsURL = 'https://jsonplaceholder.typicode.com/posts';

//   constructor(private http: HttpClient) { }

//   getData(): Observable<Posts> {

//     return this.http
//       .get<Posts>(this.postsURL);
//   }
// }