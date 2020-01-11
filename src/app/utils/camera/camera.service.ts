import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { UploadService } from '../upload/upload.service';
import { Upload } from 'src/app/models/upload';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(
    private camera: Camera, 
    private us: UploadService) { }

  AbrirCamera(): void {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.TirarFoto(options);
  }

  AbrirGaleria(): void {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    
    this.TirarFoto(options);
  }

  private TirarFoto(options: CameraOptions): void {
    this.camera.getPicture(options).then(
      imageData => {
        console.log(imageData);
    });
  }
}
