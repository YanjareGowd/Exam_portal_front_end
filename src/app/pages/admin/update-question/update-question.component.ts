import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit{

  quesid:any;
  question={
    quiz: {
      quesid:''
    },
   content: '',
   option1:'',
   option2:'',
   option3:'',
   option4:'',
   answer:''
  }

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _question:QuestionsService
  ){}

  ngOnInit(): void {

    this.quesid =this._route.snapshot.params['quesid'];

    //alert(this.quesid);

    this.question.quiz['quesid']=this.quesid;

    //To get question object
    this._question.getQuestion(this.quesid).subscribe(
      (data:any)=>{

        this.question=data;
        console.log(data);
      },
      (error)=>{
        console.log(error);
      }
    )
      
  }
  //update question
  //frist need to get the question object 
  updateQuestion()
  {
    this._question.updateQuestion(this.question).subscribe(
      (data)=>{
        Swal.fire('Success','Question Updated','success');
      },
      (error)=>{
        Swal.fire('Error','Something Went Wrong!!','error');
      }
    )
  }

}
