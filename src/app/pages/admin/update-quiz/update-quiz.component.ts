import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit{

  constructor(
    private _route: ActivatedRoute,
     private _quiz:QuizService, 
     private _cat:CategoryService,
     private _router:Router
     ){}
  qid=0;
  quiz:any;

  categories:any;

  ngOnInit(): void {

    this.qid =this._route.snapshot.params['qid']
    //alert(this.qid)
      this._quiz.getQuiz(this.qid).subscribe(
        (data)=>{
          this.quiz=data;
          console.log(this.quiz);
        },
        (error)=>{
          console.log(error);
        }
      );

      this._cat.categories().subscribe(
        (data)=>{
          this.categories=data;
        },
        (error)=>{
          console.log(error);
        }
      )
  }
  
  //update from submit

  public updateQuiz()
  {
    //alert('test');

    //validate

    this._quiz.updateQuiz(this.quiz).subscribe(
      (data)=>{
        Swal.fire('Success','quiz is Updated','success').then((e)=>{
          this._router.navigate(['/admin/quizzes']);
        });
      },
      (error)=>{
        Swal.fire('Error!!','Error while adding quiz','error');
      }
    )
  }


}
