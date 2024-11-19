import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  constructor(private router: Router) {
    console.log('HomeComponent loaded');
  }

  login(){
    this.router.navigate(['/login']);
  }

  adm(){
    this.router.navigate(['/admin']);
  }
}
