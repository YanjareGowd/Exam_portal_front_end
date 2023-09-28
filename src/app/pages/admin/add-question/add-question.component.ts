import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic'



@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit{

 
  public Edit = ClassicEditor;


  qid:any;
  qtitle:any;
  question={
    quiz: {
      qid:''
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
    private _question:QuestionsService
  ){}

  ngOnInit(): void {


    //get a quiz id from link adress  
    this.qid=this._route.snapshot.params['qid'];
    this.qtitle=this._route.snapshot.params['title'];

    //then add this qid to question and remaining can be laoad from user
    this.question.quiz['qid']=this.qid;



  }
  addQuestion(){
   
    if(this.question.content.trim()=='' || this.question.content==null)
    {
      return;
    }

    if(this.question.option1.trim()=='' || this.question.option1==null)
    {
      return;
    }

    if(this.question.option2.trim()=='' || this.question.option2==null)
    {
      return;

  }

  //from submit

  this._question.addQuestion(this.question).subscribe(
    (data)=>{
     Swal.fire('Sucess','Question added successfully','success');
     this.question.content='';
     this.question.option1='';
     this.question.option2='';
     this.question.option3='';
     this.question.option4='';
     this.question.answer='';
    },
    (error)=>{
      Swal.fire('Error','Error accured!','error');
    }
  )
}
  

}
