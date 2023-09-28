import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private snack:MatSnackBar, private login:LoginService, private router:Router){};

  public loginData={

    username:'',
    password:'',

  };

  formSubmit()
  {
   

    if(this.loginData.username.trim()==''|| 
    this.loginData.username==null)
    {
      
      this.snack.open("Username is required!!","ok", {
        duration:3000,
      });
      return;
    }

    if(this.loginData.password.trim()==''|| 
    this.loginData.password==null)
    {
      
      this.snack.open("password is required!!","ok", {
        duration:3000,
      });
      return;
    }

    //request to serve to generate token

    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log('sucess');
        console.log(data);

        //login..
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);
            this.login.getCurrentUser();
            

            //redirect ...ADMIN: admin-dashboard
            //redirect ...NORMAL: normal-dashboard
            if(this.login.getUserRole()=='ADMIN')
            {
              //admin dashboard
              //window.location.href='/admin'
              this.router.navigate(['admin'])
              this.login.loginStatusSbject.next(true);

            }else if(this.login.getUserRole()=='NORMAL'){
              //normal user dashbaord
              //window.location.href='/user-dashboard'
              this.router.navigate(['user-dashboard/0'])
              this.login.loginStatusSbject.next(true);

            }else{
              this.login.logout();
              
            }


          }
        );


      },
      (error)=> {
        console.log('Error !!');
        console.log(error);
        this.snack.open("Invaid Cerdentials, Try Again !!","ok",{
          duration: 3000
        })
      }
    );
  

}
}
