import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})

export class Container implements OnInit {
  constructor(private http: HttpClient) { }

  async ngOnInit() {
    console.log("init container");
    return await this.http.post<any>("http://localhost:58822/get-fon", {})
      .subscribe({
        next: (response: HttpResponse<any>) => {
          console.log("test");
        },
        error: (err) => {
          console.log("error", err);
        }
      });
  }
}
