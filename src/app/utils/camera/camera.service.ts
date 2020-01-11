import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { UploadService } from '../upload/upload.service';
import { Upload } from 'src/app/models/upload';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(private camera: Camera, private us: UploadService) { }

  AbrirCamera(): void {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        // const base64Image = "data:image/jpeg;base64," + imageData;

        console.log(imageData);
      }
    );
  }
}
