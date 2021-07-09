import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})

export class Container implements OnInit {
  aWhyis: any[] = [];

  constructor(private http: HttpClient) { }

  public async ngOnInit() {
    return await this.http.post("http://localhost:58822/main/get-fon", {})
      .subscribe({
        next: (response) => {
          this.aWhyis.push(response);
          console.log("Данные фона", response);
        },
        error: (err) => {
          console.log("error", err);
        }
      });
  }
}
