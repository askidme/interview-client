import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Technology} from '../../model/technology.model';


@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  private baseUrl = 'http://localhost:8080/technologies';

  constructor(private http: HttpClient) {}

  /**
   * Fetches the list of technologies from the backend.
   */
  getTechnologies(): Observable<Technology[]> {
    return this.http.get<Technology[]>(`${this.baseUrl}`);
  }
}
