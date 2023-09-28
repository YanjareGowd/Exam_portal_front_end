import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(
    private _http:HttpClient
  ) { }

  //get all questions
  public getQuestionOfQuiz(qid:any)
  {
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  //add question

  public addQuestion(question:any)
  {
    return this._http.post(`${baseUrl}/question/`,question);
  }

  //delete question

  public deleteQuestion(questionId:any)
  {
    return this._http.delete(`${baseUrl}/question/delete/${questionId}`);
  }

  //update question
  public updateQuestion(question:any)
  {
    return this._http.put(`${baseUrl}/question/`,question);
  }

  //get question with question id

  public getQuestion(quesid:any)
  {
    return this._http.get(`${baseUrl}/question/get/${quesid}`);
  }

  //get all question of quiz for Test
  public getQuestionOfQuizForTest(qid:any)
  {
    return this._http.get(`${baseUrl}/question/quiz/${qid}`);
  }

  //eval quiz
  public evalQuiz(questions:any)
  {
    return this._http.post(`${baseUrl}/question/eval-quiz`,questions);
  }

}
