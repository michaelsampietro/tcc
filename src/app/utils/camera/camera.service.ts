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
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    const image = this.TirarFoto(options);
    this.us.UploadImage(image);
  }

  AbrirGaleria(): void {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    const image = this.TirarFoto(options);
    this.us.UploadImage(image);
  }

  private TirarFoto(options: CameraOptions): string {
    let imagem: string;
    this.camera.getPicture(options).then(imageData => {
      imageData = `data:image/jpeg;base64,${imageData}`;
    })
    .catch(e => {
      console.log(e);
    });

    return imagem;
  }
}
