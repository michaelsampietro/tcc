import { Injectable } from "@angular/core";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { UploadService } from "../upload/upload.service";
import { DataService } from "src/app/services/data.service";
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class CameraService {
  constructor(private camera: Camera,
              private us: UploadService,
              private dataService: DataService,
              private router: Router) {}

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
      this.us.UploadImage(i).then( (url) => {
        const id = new Date().getTime();
        this.dataService.setData(id, url);
        this.router.navigate([`/new-look/${id}`]);
      }).catch( (err) => {
        console.log(err);
      });
    });
  }

  private async TirarFoto(options: CameraOptions) {
    const img = await this.camera.getPicture(options);
    return `data:image/jpeg;base64,${img}`;
  }
}
