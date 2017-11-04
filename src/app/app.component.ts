import { Component } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  recording:boolean=false;

  constructor(
    private http: Http
  ){}

  toggleRecord(){
    if (this.recording) {
      this.http.get('http://localhost:8000/done/');
      this.recording=false;
    }else{
      this.http.get('http://localhost:8000/start/').toPromise().then(() => {
      });
      this.recording=true;
    }
  }


}
