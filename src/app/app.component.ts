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
  inputMethod:'audio'|'text'='audio';
  textInputed:string='';
  loading:boolean=false;
  messages:{
    position:'left'|'right';
    data:any;
  }[]=[{
    position:'left',
    data:{
      type:'plain',
      content:'Hello!'
    }
  }];
  @ViewChild('chatMessages') private chatMessages: ElementRef;

  constructor(
    private http: Http
  ){}

  toggleInputMethod(){
    this.textInputed='';
    if (this.inputMethod === 'audio') {
      this.inputMethod='text';
    }else{
      this.inputMethod='audio';
    }
  }

  toggleRecord(){
    if (this.recording) {
      this.http.get('http://localhost:8000/interact/stop/').toPromise().then((res) => {
        if (res.text() === '') {
          this.loading=false;
          return;
        }
        this.http.post('http://localhost:8000/interact/process/',res.text()).toPromise().then((res) => {
          for (let data of res.json()) {
            this.messages.push({
              position:'left',
              data:data
            });
          }
          this.loading=false;
          setTimeout(()=>{
            this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
          },1);
        });
        this.messages.push({
          position:'right',
          data:{
            type:'plain',
            content:res.text()
          }
        });
        setTimeout(()=>{
          this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
        },1);
      });
      this.loading=true;
      this.recording=false;
      setTimeout(()=>{
        this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
      },1);
    }else{
      this.http.get('http://localhost:8000/interact/start/').toPromise().then(() => {
      });
      this.recording=true;
    }
  }


  textProcess(){
    this.messages.push({
      position:'right',
      data:{
        type:'plain',
        content:this.textInputed
      }
    });
    this.loading=true;
    setTimeout(()=>{
      this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
    },1);
    this.http.post('http://localhost:8000/interact/process/',this.textInputed).toPromise().then((res) => {
      for (let data of res.json()) {
        this.messages.push({
          position:'left',
          data:data
        });
      }
      this.loading=false;
      setTimeout(()=>{
        this.chatMessages.nativeElement.scrollTop = this.chatMessages.nativeElement.scrollHeight;
      },1);
    });
    this.textInputed='';
  }


}
