import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InterviewQuestion} from '../../model/interview-question.model';

@Injectable({
  providedIn: 'root'
})
export class InterviewQuestionService {

  private baseUrl = 'http://localhost:8080/questions';

  constructor(private http: HttpClient) {}

  getQuestionsByTopicId(topicId: number, pageNumber: number): Observable<InterviewQuestion[]> {
    return this.http.get<InterviewQuestion[]>(`${this.baseUrl}/${topicId}/${pageNumber}`);
  }
}
