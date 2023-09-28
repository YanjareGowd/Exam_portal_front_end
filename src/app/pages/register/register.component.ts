import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private userService:UserService, private snack:MatSnackBar){}
  

  public user={

    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phoneNumber:'',

  };

  formSubmit()
  {
    console.log(this.user);
    if(this.user.username==''|| this.user.username==null) {
    // alert("Username is required!!");
    this.snack.open('Username is required!!','ok',{
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  return;
  }

  //add user: userService
  this.userService.addUser(this.user).subscribe(
    (data:any)=>{
      //sucess
      console.log(data);
     // alert('Success');
     Swal.fire('Sucessfully registered','user id is '+data.id,'success');
    },
    (error)=>{
      //error
      console.log(error);
      //alert('Something Went wrong');
      this.snack.open('Something Went wrong','',{
        duration: 3000,
      })
    }
  )

  }

  //this.user

}
