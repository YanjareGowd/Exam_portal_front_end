import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-startquiz',
  templateUrl: './startquiz.component.html',
  styleUrls: ['./startquiz.component.css']
})
export class StartquizComponent implements OnInit {

  qid:any;
  questions:any;
  marksGot=0;
  correctAnswers=0;
  attempted=0;

  isSubmit=false;
  timer:any;


  constructor(
    private locationSt:LocationStrategy,
    private _route:ActivatedRoute,
    private _question:QuestionsService
  ){}
  ngOnInit(): void {

    this.preventBackButton();
    this.qid=this._route.snapshot.params['qid']
    //console.log(this.qid);
    this.loadQuestions();
    
      
  }

  preventBackButton()
  {
    history.pushState(null,'',location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,'',location.href);
    })
  }

  loadQuestions()
  {
    this._question.getQuestionOfQuizForTest(this.qid).subscribe(
      (data)=>{
       this.questions=data;

       this.timer=this.questions.length * 1 * 60;

      /* this.questions.forEach((q:any)=>{
        q['givenAnswer']='';
       })**/

       console.log(this.questions);
       this.startTimmer();
       
        
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error','Something Went wrong','error');
        
      }
    )
  }

  //submit quiz
  submitQuiz()
  {

    Swal.fire(
      {
        title: 'Do you want to Submit the quiz?',
        showCancelButton: true,
        confirmButtonText: 'Submit',
       
        icon:'info'
      }).then((e)=>{
        if(e.isConfirmed)
        this.evalQuiz();
      })
      
      /*.then((e)=>{
        if(e.isConfirmed)
        {
          //calculation
          //console.log(this.questions);
          this.evalQuiz();
         
      })*/

  }
  //timmer
  startTimmer()
  {
   let t= window.setInterval(()=>{
      //code
      if(this.timer <= 0)
      {
        this.evalQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000);
  }

  //formate timmer

  getFormattedTimmer()
  {
    let mm=Math.floor(this.timer/60)
    let ss=this.timer-mm*60
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz()
  {

    //call to serve 
    this._question.evalQuiz(this.questions).subscribe(
      (data:any)=>{

        console.log(data);
        this.marksGot=parseFloat((data.marksGot).toFixed(2));
        this.correctAnswers=data.correctAnswers;
        this.attempted=data.attempted;
        this.isSubmit=true

        
      },
      (error)=>{
        console.log(error);
        
      }
    )
    //evaluation of quiz on front end
    /*
    this.isSubmit=true;

    this.questions.forEach((q:any)=>{
      if(q.givenAnswer==q.answer)
      {
        this.correctAnswers++;
       let marksSingle=  this.questions[0].quiz.maxMarks/this.questions.length;
       this.marksGot +=marksSingle;
      }
     
      if(q.givenAnswer.trim()!='')
      {
        this.attempted++;
      }

    });
    console.log("Correct Answers"+ this.correctAnswers);
    console.log("Marks GOt"+this.marksGot);
    console.log("attempted: "+this.attempted)
    */

   
  }
 
   //print
   printPage()
   {
     window.print();
   }


}
