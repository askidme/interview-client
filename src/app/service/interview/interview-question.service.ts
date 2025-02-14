import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InterviewQuestion} from '../../model/interview-question.model';
import {InterviewQuestionsRequest} from '../../model/interview-question-request.model';
import {InterviewQuestionResponse} from '../../model/interview-quesition-response.model';

@Injectable({
  providedIn: 'root'
})
export class InterviewQuestionService {

  private baseUrl = 'http://localhost:8080/questions';

  constructor(private http: HttpClient) {}

  getQuestionsByTopicId(topicId: number, pageNumber: number): Observable<InterviewQuestion[]> {
    return this.http.get<InterviewQuestion[]>(`${this.baseUrl}/${topicId}/${pageNumber}`);
  }

  getConfidenceLevels(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl);
  }

  getQuestionIds(
    requestBody: InterviewQuestionsRequest
  ): Observable<InterviewQuestionResponse> {
    return this.http.post<InterviewQuestionResponse>(
      `${this.baseUrl}`,
      requestBody // Directly send the request body
    );
  }

  getQuestion(questionId: number): Observable<InterviewQuestion> {
    console.log(`${this.baseUrl}/${questionId}`);
    return this.http.get<InterviewQuestion>(`${this.baseUrl}/${questionId}`);
  }

}
