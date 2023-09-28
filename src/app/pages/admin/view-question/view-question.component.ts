import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css']
})
export class ViewQuestionComponent implements OnInit{

  qid:any;
  qtitle:any;
 /* questions=[
    {
      quiz: {
        qid:''
      },
     content: '',
     option1:'',
     option2:'',
     option3:'',
     option4:'',
     answer:'',
     quesid:'',
    }S
  ]*/
  questions:any;
  constructor( 
    private _route: ActivatedRoute,
    private _question:QuestionsService
  ){}

  ngOnInit(): void {

    
    this.qid= this._route.snapshot.params['qid'];
    this.qtitle=this._route.snapshot.params['title'];

    this._question.getQuestionOfQuiz(this.qid).subscribe(
      (data:any)=>{
        console.log(data);
        this.questions=data;
      },
      (error)=>{
        console.log(error)
      }
    )
    
    
      
  }

  //delete question

  deleteQuestion(quesid:any){
    
    Swal.fire({
      icon:'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title:'Are you Sure, Want to delete this question?'
    }).then((result)=>{
      if(result.isConfirmed)
      {
        //delete
         this._question.deleteQuestion(quesid).subscribe(
          (data)=>{
            this.questions= this.questions.filter((ques:any)=>ques.quesid!=quesid);
            Swal.fire('Success', 'Question Deleted','success');
          },
          (error)=>{
            Swal.fire('Error', 'Error while Deleting question','error');
          }
         )
      }
     });
  }

  

}
