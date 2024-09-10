import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule] 
})
export class DashboardComponent {
  mediaRecorder!: MediaRecorder;
  audioChunks: Blob[] = [];     //blob is the object for the audio chunks
  isRecording=false;

  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/login']);
  }

  async startRecording() {     //asynchronous operations-request access for microphone 
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.addEventListener('dataavailable', event => {
        this.audioChunks.push(event.data);   //the audio blob is stored in the event.data
      });
      this.mediaRecorder.start();
      this.isRecording=true;
      console.log('Recording started');
    } catch (error) {
      console.error('Could not start recording:', error);
    }
  }

  stopRecording() { 
    this.mediaRecorder.stop();
    this.isRecording=false;
    console.log('Recording stopped');
    this.saveAudio();
  }

  saveAudio() {
    const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });  //chunks saved a .wav file
    const audioUrl = URL.createObjectURL(audioBlob);  
    const a = document.createElement('a');
    a.href = audioUrl;      //create a url of the recorded audio
    a.download = 'recording.wav';
    a.click();
    URL.revokeObjectURL(audioUrl);       //clean the object url to prevent memory leaks 
  }
}