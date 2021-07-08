import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class App implements OnInit {
  ngOnInit() {
    console.log("init start");
  }
}
