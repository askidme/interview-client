import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserQuestion} from '../../model/user-question.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserQuestionService {
  private baseUrl = 'http://localhost:8080/user-questions';

  constructor(private http: HttpClient) {}

  saveOrUpdateUserQuestion(userQuestion: UserQuestion): Observable<UserQuestion> {
    return this.http.post<UserQuestion>(this.baseUrl, userQuestion);
  }
}
