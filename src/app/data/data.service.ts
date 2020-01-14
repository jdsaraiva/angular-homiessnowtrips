import { Injectable } from '@angular/core';
import {FormSettings} from './form-settings';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

    postUserSettingsForm(formSettings: FormSettings): Observable<any> {

      return this.http.post('http://homiessnowtrips.pt/process.php', formSettings);

  }
}
