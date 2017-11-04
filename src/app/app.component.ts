import {Component, ElementRef, ViewChild} from '@angular/core';
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
  loading:boolean=false;
  @ViewChild('chatMessages') private chatMessages: ElementRef;

  constructor(
    private http: Http
  ){}

  toggleRecord(){
    if (this.recording) {
      this.http.get('http://localhost:8000/stop/').toPromise().then(() => {

      });
      this.loading=true;
      this.recording=false;
      setTimeout(()=>{
        this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
      },1);
    }else{
      this.http.get('http://localhost:8000/start/').toPromise().then(() => {
      });
      this.recording=true;
    }
  }


}
