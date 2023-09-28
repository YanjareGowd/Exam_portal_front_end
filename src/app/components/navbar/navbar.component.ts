import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn=false;
Currentuser=null;

  constructor(public login:LoginService){}

  ngOnInit():void{
    this.isLoggedIn=this.login.isLoggedIn();
    this.Currentuser=this.login.getUser();
   this.login.loginStatusSbject.asObservable().subscribe(data=>{

    this.isLoggedIn=this.login.isLoggedIn();
    this.Currentuser=this.login.getUser();

   });
  }

  public logout(): void
  {
    this.login.logout();
   window.location.reload();
  }

}
