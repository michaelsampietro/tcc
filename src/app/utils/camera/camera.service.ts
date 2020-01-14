import { Injectable } from "@angular/core";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { UploadService } from "../upload/upload.service";

@Injectable({
  providedIn: "root"
})
export class CameraService {
  constructor(private camera: Camera, private us: UploadService) {}

  AbrirCamera(): void {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.TirarFoto(options).then(i => {
      console.log(i);
      this.us.UploadImage(i);
    });
  }

  AbrirGaleria(): void {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.TirarFoto(options).then(i => {
      console.log(i)
      this.us.UploadImage(i);
    });
  }

  private async TirarFoto(options: CameraOptions) {
    
    const img = await this.camera.getPicture(options);
    return `data:image/jpeg;base64,${img}`;
  };
}
