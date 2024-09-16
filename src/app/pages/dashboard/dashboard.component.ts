//WAV FORMAT

// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';
// //import * as CryptoJS from 'crypto-js';
// import CryptoJS from 'crypto-js';

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css'],
//   imports: [CommonModule]
// })
// export class DashboardComponent {
//   mediaRecorder!: MediaRecorder;
//   audioChunks: Blob[] = [];
//   isRecording = false;
//   encryptionKey = 'key'; // replace with a secure key

//   constructor(private router: Router) {}

//   logout() {
//     this.router.navigate(['/login']);
//   }

//   async startRecording() {
//     this.audioChunks = [];

//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       this.mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

//       this.mediaRecorder.addEventListener('dataavailable', event => {
//         this.audioChunks.push(event.data);
//       });

//       // start recording
//       this.mediaRecorder.start();
//       this.isRecording = true;
//       console.log('Recording started');
//     } catch (error) {
//       console.error('Could not start recording:', error);
//     }
//   }

//   stopRecording() {
//     if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
//       // stop recording
//       this.mediaRecorder.stop();

//       this.mediaRecorder.addEventListener('stop', () => {
//         this.isRecording = false;
//         console.log('Recording stopped');
//         this.saveAudio(); // call saveAudio() only after stop event
//       });
//     }
//   }

//   async saveAudio() {
//     const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
//     const reader = new FileReader();

//     reader.onloadend = () => {
//       const audioArrayBuffer = reader.result as ArrayBuffer;
//       const audioData = new Uint8Array(audioArrayBuffer);

//       // Encrypt the audio data
//       const encryptedData = CryptoJS.AES.encrypt(
//         String.fromCharCode(...audioData),
//         this.encryptionKey
//       ).toString();

//       // Convert encrypted data to Uint8Array
//       const encryptedBytes = this.base64ToUint8Array(encryptedData);

//       // Create WAV header
//       const header = this.createWavHeader(encryptedBytes.length);
//       const wavBlob = new Blob([header, encryptedBytes], { type: 'audio/wav' });

//       // Create a download link
//       const wavUrl = URL.createObjectURL(wavBlob);
//       const a = document.createElement('a');
//       a.href = wavUrl;
//       a.download = 'encrypted_recording.wav'; // Save with .wav extension
//       a.click();

//       // Clean up memory
//       URL.revokeObjectURL(wavUrl);
//       console.log('Audio saved as encrypted_recording.wav');
//     };

//     reader.readAsArrayBuffer(audioBlob);
//   }

//   // Convert base64 string to Uint8Array
//   base64ToUint8Array(base64: string): Uint8Array {
//     const binaryString = window.atob(base64);
//     const len = binaryString.length;
//     const bytes = new Uint8Array(len);
//     for (let i = 0; i < len; i++) {
//       bytes[i] = binaryString.charCodeAt(i);
//     }
//     return bytes;
//   }

//   // Create a simple WAV header
//   createWavHeader(dataSize: number): Uint8Array {
//     const header = new Uint8Array(44);
//     const view = new DataView(header.buffer);

//     // RIFF chunk descriptor
//     view.setUint8(0, 'R'.charCodeAt(0));
//     view.setUint8(1, 'I'.charCodeAt(0));
//     view.setUint8(2, 'F'.charCodeAt(0));
//     view.setUint8(3, 'F'.charCodeAt(0));
//     view.setUint32(4, 36 + dataSize, true); // ChunkSize
//     view.setUint8(8, 'W'.charCodeAt(0));
//     view.setUint8(9, 'A'.charCodeAt(0));
//     view.setUint8(10, 'V'.charCodeAt(0));
//     view.setUint8(11, 'E'.charCodeAt(0));

//     // Format
//     view.setUint8(12, 'f'.charCodeAt(0));
//     view.setUint8(13, 'm'.charCodeAt(0));
//     view.setUint8(14, 't'.charCodeAt(0));
//     view.setUint8(15, ' '.charCodeAt(0));
//     view.setUint32(16, 16, true); // Subchunk1Size
//     view.setUint16(20, 1, true); // AudioFormat (1 = PCM)
//     view.setUint16(22, 1, true); // NumChannels
//     view.setUint32(24, 44100, true); // SampleRate
//     view.setUint32(28, 44100 * 2, true); // ByteRate
//     view.setUint16(32, 2, true); // BlockAlign
//     view.setUint16(34, 16, true); // BitsPerSample

//     // Data
//     view.setUint8(36, 'd'.charCodeAt(0));
//     view.setUint8(37, 'a'.charCodeAt(0));
//     view.setUint8(38, 't'.charCodeAt(0));
//     view.setUint8(39, 'a'.charCodeAt(0));
//     view.setUint32(40, dataSize, true); // Subchunk2Size

//     return header;
//   }
// }




import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule]
})
export class DashboardComponent {
  mediaRecorder!: MediaRecorder;
  audioChunks: Blob[] = [];
  isRecording = false;
  encryptionKey = 'key'; // replace with a secure key

  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/login']);
  }

  async startRecording() {
    this.audioChunks = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

      this.mediaRecorder.addEventListener('dataavailable', event => {
        this.audioChunks.push(event.data);
      });

      // Start recording
      this.mediaRecorder.start();
      this.isRecording = true;
      console.log('Recording started');
    } catch (error) {
      console.error('Could not start recording:', error);
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      // Stop recording
      this.mediaRecorder.stop();

      this.mediaRecorder.addEventListener('stop', () => {
        this.isRecording = false;
        console.log('Recording stopped');
        this.saveAudio(); // Call saveAudio() only after stop event
      });
    }
  }

  async saveAudio() {
    const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
    const reader = new FileReader();

    reader.onloadend = () => {
      const audioArrayBuffer = reader.result as ArrayBuffer;
      const audioData = new Uint8Array(audioArrayBuffer);

      // Encrypt the audio data
      const encryptedData = CryptoJS.AES.encrypt(
        String.fromCharCode(...audioData),
        this.encryptionKey
      ).toString();

      // Save encrypted data as a text file
      const encryptedBlob = new Blob([encryptedData], { type: 'text/plain' });
      const downloadUrl = URL.createObjectURL(encryptedBlob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = 'encrypted_audio.txt'; // Save with .txt extension
      a.click();

      // Clean up memory
      URL.revokeObjectURL(downloadUrl);
      console.log('Encrypted audio saved as encrypted_audio.txt');
    };

    reader.readAsArrayBuffer(audioBlob);
  }

  async decryptAudio(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0]; //access to the files
  
    if (file) {
      const reader = new FileReader(); //open the file, the FileReader reads the contents of the file selected
  
      reader.onload = async () => {
        const encryptedText = reader.result as string;
        const key = prompt('Enter the encryption key'); // Ask for the security key
  
        if (key) {
          try {
            // Decrypt the data
            const decryptedBytes = CryptoJS.AES.decrypt(encryptedText, key);
            const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
  
            const decryptedArray = Uint8Array.from(
              decryptedText.split('').map(char => char.charCodeAt(0))
            );
  
            // create audio blob and save it-webm format
            const audioBlob = new Blob([decryptedArray], { type: 'audio/webm' });
            const downloadUrl = URL.createObjectURL(audioBlob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = 'decrypted_audio.webm'; 
            a.click();
  
            // Clean up memory
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