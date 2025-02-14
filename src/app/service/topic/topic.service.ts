import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Topic} from '../../model/topic.model';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private baseUrl = 'http://localhost:8080/topics';

  constructor(private http: HttpClient) { }

  getTopics(): Observable<Topic[]>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get<Topic[]>(this.baseUrl,{
      withCredentials: true,
      headers: new HttpHeaders({ 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpZC5hc2thcm92QGdtYWlsLmNvbSIsImlhdCI6MTczNzQxNTQ2OCwiZXhwIjoxNzM3NDUxNDY4fQ.EImlvJ-iF-6L9NkVmDyCXxR1DfmyYHLQ7Hwtni9Byc8' })
    })
  }

  /**
   * Fetches the list of topics for a specific technology ID.
   * @param techId The ID of the technology
   * @returns Observable of an array of TopicDTO
   */
  getTopicsByTechnology(techId: number): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${this.baseUrl}/by-tech/${techId}`);
  }
}
