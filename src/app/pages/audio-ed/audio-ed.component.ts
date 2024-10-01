import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-audio-ed',
  standalone: true,
  templateUrl: './audio-ed.component.html',
  styleUrls: ['./audio-ed.component.css'],
  imports: [CommonModule]
})
export class AudioEdComponent {
  mediaRecorder!: MediaRecorder;
  audioChunks: Blob[] = [];
  isRecording = false;
  encryptionKey = '7410qaz'; // Replace with a secure key

  async startRecording() {
    this.audioChunks = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

      this.mediaRecorder.addEventListener('dataavailable', event => {
        this.audioChunks.push(event.data);
      });

      this.mediaRecorder.start();
      this.isRecording = true;
      console.log('Recording started');
    } catch (error) {
      console.error('Could not start recording:', error);
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
      this.mediaRecorder.addEventListener('stop', () => {
        this.isRecording = false;
        this.saveAudio();
      });
    }
  }

  async saveAudio() {
    const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
    const reader = new FileReader();

    reader.onloadend = () => {
      const audioArrayBuffer = reader.result as ArrayBuffer;
      const audioData = new Uint8Array(audioArrayBuffer);

      const encryptedData = CryptoJS.AES.encrypt(
        String.fromCharCode(...audioData),
        this.encryptionKey
      ).toString();

      const encryptedBlob = new Blob([encryptedData], { type: 'text/plain' });
      const downloadUrl = URL.createObjectURL(encryptedBlob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'encrypted_audio.txt';
      a.click();

      URL.revokeObjectURL(downloadUrl);
      console.log('Encrypted audio saved as encrypted_audio.txt');
    };

    reader.readAsArrayBuffer(audioBlob);
  }

  async decryptAudio(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const encryptedText = reader.result as string;
        const key = prompt('Enter the encryption key');

        if (key) {
          try {
            const decryptedBytes = CryptoJS.AES.decrypt(encryptedText, key);
            const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);

            const decryptedArray = Uint8Array.from(
              decryptedText.split('').map(char => char.charCodeAt(0))
            );

            const audioBlob = new Blob([decryptedArray], { type: 'audio/webm' });
            const downloadUrl = URL.createObjectURL(audioBlob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = 'decrypted_audio.webm';
            a.click();

            URL.revokeObjectURL(downloadUrl);
            console.log('Decrypted audio saved as decrypted_audio.webm');
          } catch (error) {
            console.error('Decryption failed:', error);
          }
        }
      };
      reader.readAsText(file);
    }
  }
}
