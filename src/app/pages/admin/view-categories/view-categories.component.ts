import { Component,OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit { 

  categories=[
    {
      cid:'',
      title:'',
      description:''
    }
  ]

  constructor(private _category:CategoryService){}

  ngOnInit(): void {
      this._category.categories().subscribe((data : any)=>{
        //success
        this.categories=data;
        console.log(this.categories);
      },

      (error)=>{
        //
        console.log(error);
        //sweet alert
        Swal.fire("Error !!","error in loading data",'error')
      }
      )
  }

  //delete category
  deleteCategory(cid:any)
  {
    
    // console.log(cid);
    // alert(cid);
   Swal.fire({
    icon: 'info',
    title:'Are you sure? ',
    confirmButtonText: 'Delete',
    showCancelButton: true
   }).then((result)=>{
    if(result.isConfirmed)
    {
      //delete
      this._category.deleteCategory(cid).subscribe(
        (data)=>{
          this.categories= this.categories.filter((cat)=>cat.cid!=cid);
          Swal.fire('Success', 'Quiz Deleted','success');
        },
        (error)=>{
          Swal.fire('Error', 'Error while Deleting quiz','error');
        }
       )
    }
   })
  }

}
