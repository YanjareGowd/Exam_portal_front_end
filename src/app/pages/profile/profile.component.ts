import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs'; // Import Observable
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any; // Adjust the type if you have a specific type for the user

  constructor(public login: LoginService) {}

  ngOnInit(): void {
    // Use .subscribe() to get the data from the observable
    this.user=this.login.getUser();
  }
}
