import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  recording:boolean=false;
  // recordRTC=null;
  recorder=null;
  blob=null;



  ngOnInit(){
    // let session = {
    //   audio: true,
    //   video: false
    // };
    // navigator.getUserMedia(session, (mediaStream)=>{
    //   this.recordRTC = eval('RecordRTC(MediaStream)');
    // }, ()=>{});
  }

  toggleRecord(){
    // let session = {
    //   audio: true,
    //   video: false
    // };
    if (this.recording) {
      // this.recorder.stop();
    }else{
      function startUserMedia(stream) {
        var input = audio_context.createMediaStreamSource(stream);
        __log('Media stream created.');
        // Uncomment if you want the audio to feedback directly
        //input.connect(audio_context.destination);
        //__log('Input connected to audio context destination.');

        recorder = new Recorder(input);
        __log('Recorder initialised.');
      }
      navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
        __log('No live audio input: ' + e);
      });
      // navigator.getUserMedia(session, (mediaStream)=>{
      //   // this.recordRTC = eval('RecordRTC(MediaStream)');
      //   this.recorder = new window['MediaRecorder'](mediaStream);
      //   this.recorder.ondataavailable = (event)=>{
      //     if (this.recorder.state === 'recording') {
      //       this.blob = new window.Blob([event.data], {
      //         type: 'audio/ogg'
      //       });
      //       // use the created blob
      //
      //       console.log(this.blob);
      //     }
      //   };
      //
      //   this.recorder.onstop = function() {
      //     this.recorder = null;
      //     console.log(this.blob);
      //   };
      //
      //   this.recorder.start(length);
      // }, ()=>{});
    }
    this.recording=!this.recording;
  }



}
